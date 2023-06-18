import React from "react";
import AuthService from "../../services/AuthService";
import {Card, Col} from "react-bootstrap";

export const ProfileCard = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
      <Col className="mb-3">
        <Card>
          <Card.Body>
            <div className="d-flex flex-column align-items-center text-center">
              <img src={require("../../assets/images/patient.png")}
                   alt="Patient" className="rounded-circle"
                   width="213"/>
              <div className="mt-3">
                <h4>{currentUser.email}</h4>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
  )
}