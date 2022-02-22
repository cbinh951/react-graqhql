import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';
import BookDetail from './BookDetail';

import { useQuery } from '@apollo/client';
import { getBooks } from '../graphql-client/queries';

const BookList = () => {
  const [bookSelected, setBookSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooks);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log('data', data);

  return (
    <Row>
      <Col xs={8} md={8}>
        <CardGroup>
          {data.books.map((book) => (
            <Card
              border="info"
              text="info"
              className="text-center shadow"
              key={book.id}
              onClick={() => setBookSelected(book.id)}
            >
              <Card.Body>{book.name}</Card.Body>
            </Card>
          ))}
        </CardGroup>
      </Col>
      <Col>
        <BookDetail bookId={bookSelected} />
      </Col>
    </Row>
  );
};

export default BookList;
