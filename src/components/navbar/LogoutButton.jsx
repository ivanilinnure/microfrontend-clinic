import React from 'react';
import {LinkContainer} from "react-router-bootstrap";
import {Button} from "react-bootstrap";

export const LogoutButton = ({handleLogOut}) => {

  return (
      <LinkContainer to="/login">
        <Button variant="warning" onClick={handleLogOut}>
          Вийти
        </Button>
      </LinkContainer>
  );
};
