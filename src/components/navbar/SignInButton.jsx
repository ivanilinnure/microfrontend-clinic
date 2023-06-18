import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

export const SignInButton = () => {
  return (
      <LinkContainer to="/login">
        <Button className="me-2" variant="outline-primary">
          Увійти
        </Button>
      </LinkContainer>
  );
};