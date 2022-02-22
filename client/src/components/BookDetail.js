import React from 'react';
import Card from 'react-bootstrap/Card'

import { useQuery } from '@apollo/client';
import { getSingleBook } from '../graphql-client/queries';

const BookDetail = ({bookId}) => {
  const {loading, error, data} = useQuery(getSingleBook, {
    variables: {
      id: bookId
    },
    skip: bookId === null
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error Loading...</p>

  const book = bookId !== null ? data.book : null

  return (
    <Card bg="info" text='white' className='shadow'>
      <Card.Body>
        {
          book === null ? (
            <h2>Please select the book</h2>
          ) : (
            <>
              <Card.Title>{book.name}</Card.Title>
              <Card.Subtitle>{book.genre}</Card.Subtitle>
              <Card.Text>
                <p>{book.author.name}</p>
                <p>Age: {book.author.age}</p>
                <p>All book by this author</p>
                <ul>
                  {
                    book.author.books.map(book => (
                      <li key={book.id}>{book.name}</li>
                    ))
                  }
                </ul>
              </Card.Text>
            </>
          )
        }
        
      </Card.Body>
    </Card>
  );
};

export default BookDetail;