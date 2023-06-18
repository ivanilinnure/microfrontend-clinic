import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import PatientService from "./PatientService";

export const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    PatientService.getPatientAppointments()
        .then(res => setAppointments(res.data))
        .catch(error => console.log(error))
  }, [])

  const handleButton = async e => {
    e.preventDefault();
    await PatientService.cancelPatientAppointment(e.target.value)
    await PatientService.getPatientAppointments()
        .then(res => setAppointments(res.data))
        .catch(error => console.log(error))
  };

  return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Погоджені прийоми:</Card.Title>
            <Row xs={1} md={2} className="g-4 mt-0">
              {appointments.map(appointment =>
                  <Col key={appointment.id}>
                    <Card bg={"light"}>
                      <Card.Body>
                        <Card.Title>Прийом</Card.Title>
                        <div className="mt-2">
                          <strong>Доктор: </strong> {appointment.doctor.firstName + " " + appointment.doctor.secondName}
                        </div>
                        <div className="mt-2">
                          <strong>Дата: </strong> {new Date(appointment.dateAndTime).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <strong>Час: </strong> {new Date(appointment.dateAndTime).toLocaleTimeString()}
                        </div>
                        <div className="mt-2">
                          <Button variant={"danger"} value={appointment.id}
                                  onClick={handleButton}>Відмінити</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Container>
  )
}