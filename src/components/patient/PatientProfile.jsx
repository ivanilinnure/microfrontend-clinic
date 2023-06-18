import React from 'react';
import {PatientAppointments} from "./PatientAppointments";
import {ProfileCard} from "../profile/ProfileCard";
import {PatientInfo} from "./PatientInfo";
import {Container, Row} from "react-bootstrap";

export const PatientProfile = () => {

  return (
      <Container className="container mt-3">
        <Row>
          <ProfileCard/>
          <PatientInfo/>
          <PatientAppointments/>
        </Row>
      </Container>
  );
};