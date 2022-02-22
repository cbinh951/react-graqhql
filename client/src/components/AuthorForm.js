import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { getAuthors, getBooks } from '../graphql-client/queries';
import { addSingleAuthor } from '../graphql-client/mutation';

const AuthorForm = () => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    age: '',
  });

  const onInputChange = (event) => {
    setNewAuthor({
      ...newAuthor,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('new book', newAuthor);
    addAuthor({
      variables: {
        name: newAuthor.name,
        age: parseInt(newAuthor.age),
      },
      refetchQueries: [{ query: getAuthors }],
    });
    setNewAuthor({
      name: '',
      age: '',
    });
  };

  // Graphql Operation
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="invisible">
        <Form.Control />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Author name"
          name="name"
          onChange={onInputChange}
          value={newAuthor.name}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="number"
          placeholder="Author age"
          name="age"
          onChange={onInputChange}
          value={newAuthor.age}
        />
      </Form.Group>

      <Button className="float-right" variant="info" type="submit">
        Add author
      </Button>
    </Form>
  );
};

export default AuthorForm;
