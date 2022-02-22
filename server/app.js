const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose  = require('mongoose')

// Load schema & resolver
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://cbinh951:congbinh95@tutorialgraphql.q0zmc.mongodb.net/TutorialGraphql?retryWrites=true&w=majority', {
      // useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false
    })
    console.log('MongoDB connect');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

async function startApolloServer(typeDefs, resolvers){
  const server = new ApolloServer({typeDefs, resolvers, context: () => ({ mongoDataMethods }) })
  const app = express();
  await server.start();
  server.applyMiddleware({app, path: '/graphql'});
  connectDB();
  
  app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);
