import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import AuthorForm from './AuthorForm';
import BookForm from './BookForm';


const Forms = () => {
  return (
    <Row>
      <Col>
        <BookForm />
      </Col>
      <Col>
        <AuthorForm />
      </Col>
    </Row>
  );
};

export default Forms;
