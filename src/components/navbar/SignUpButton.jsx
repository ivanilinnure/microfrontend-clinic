import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

export const SignUpButton = () => {
  return (
      <LinkContainer to="/register">
        <Button variant="warning">
          Зареєструватись
        </Button>
      </LinkContainer>
  );
};
