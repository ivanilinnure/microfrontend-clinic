import React, {useEffect, useState} from "react";
import DoctorService from "./DoctorService";
import {Card, Col, Row} from "react-bootstrap";

export const DoctorInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
        DoctorService().getDoctorById()
            .then(res => {
              setFirstName(res.data.firstName);
              setSecondName(res.data.secondName);
              setContactNumber(res.data.contactNumber);
            })
            .catch(error => {
              console.log(error)
            });
      }, []
  );

  return (
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <h6>Ім'я</h6>
              </Col>
              <Col sm={7} className="text-secondary">
                {firstName}
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <h6>Прізвище</h6>
              </Col>
              <Col sm={7} className="text-secondary">
                {secondName}
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <h6>Контактний номер</h6>
              </Col>
              <Col sm={7} className="text-secondary">
                {contactNumber}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
  )
}