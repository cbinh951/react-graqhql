import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { getAuthors, getBooks } from '../graphql-client/queries';
import { addSingleBook } from '../graphql-client/mutation';

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const onInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('new book', newBook);
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{query: getBooks}]
    });
    setNewBook({
      name: '',
      genre: '',
      authorId: '',
    });
  };

   // Graphql Operation
   const { loading, error, data } = useQuery(getAuthors);

   const [addBook, dataMutation] = useMutation(addSingleBook);
 
  return (
    <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Book name"
              name="name"
              onChange={onInputChange}
              value={newBook.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Book genre"
              name="genre"
              onChange={onInputChange}
              value={newBook.genre}
            />
          </Form.Group>
          <Form.Group>
            {loading ? (
              <p>Loading author...</p>
            ) : (
              <Form.Control
                as="select"
                name="authorId"
                onChange={onInputChange}
                value={newBook.authorId}
              >
                <option disabled value="">
                  Select author
                </option>
                {data.authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add book
          </Button>
        </Form>
  );
};

export default BookForm;