import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ProfileCard} from "../profile/ProfileCard";
import {DoctorInfo} from "./DoctorInfo";
import DoctorService from "./DoctorService";
import {DoctorFreeAppointments} from "./DoctorFreeAppointments";
import {DoctorBusyAppointments} from "./DoctorBusyAppointments";
import AuthService from "../../services/AuthService";

export const DoctorProfile = () => {
  const user = AuthService.getCurrentUser();
  const [appointmentMode, setAppointmentMode] = useState(false);
  const [freeAppointments, setFreeAppointments] = useState([]);
  const [busyAppointments, setBusyAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentException, setAppointmentException] = useState(false);
  const [created, setCreated] = useState(false)

  useEffect(() => {
    updateAppointments();
  }, [])

  const onClickSetAppointmentMode = e => {
    e.preventDefault();
    setDate("")
    setTime("")
    setAppointmentMode(!appointmentMode)
    setCreated(false)
    setAppointmentException(false)
  }

  const onSubmitCreateAppointment = async e => {
    e.preventDefault();
    await DoctorService().createDoctorAppointment(date + "T" + time)
        .then(() => {
          setCreated(true)
          setAppointmentException(false)
        })
        .catch(() => {
          setCreated(false)
          setAppointmentException(true)
        })
    await updateAppointments();
    setDate("")
    setTime("")
    e.target.reset();
  }

  const onClickActionAppointment = async e => {
    await DoctorService().deleteAppointment(e.target.value)
        .catch(error => console.log(error))
    await updateAppointments();
  }

  const updateAppointments = () => {
    DoctorService().getFreeDoctorAppointments(user.userId)
        .then(res => setFreeAppointments(res))
        .catch(error => console.log(error))
    DoctorService().getBusyDoctorAppointments()
        .then(res => setBusyAppointments(res))
        .catch(error => console.log(error))

  }

  return (
      <Container className="container mt-3">
        <Row lg={3} md={2} sm={1}>
          <ProfileCard/>
          <Col>
            <DoctorInfo/>
            <Card className="mt-2">
              <Card.Body className="card-body align-items-center d-flex justify-content-center">
                <Button variant={appointmentMode ? "danger" : "primary"} onClick={onClickSetAppointmentMode}>
                  <span>{appointmentMode ? "Завершити редагування" : "Редагувати розклад"}</span>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {appointmentMode && (
              <Card border="dark" className="mb-3 mt-sm-3 mt-lg-0">
                <Container id="auth-container" className="d-grid">
                  <Form onSubmit={onSubmitCreateAppointment}>
                    <h4 className="text-center mt-3 mb-3">Додати новий прийом</h4>
                    <Form.Control type="date" min={new Date().toISOString().split('T')[0]}
                                  className="text-center p-2 w-125 mb-3"
                                  onBlur={event => setDate(event.target.value)}/>
                    <Form.Control type="time" className="text-center p-2 w-125 mb-3"
                                  onBlur={event => setTime(event.target.value)}/>
                    <div className="d-grid">
                      <Button type="submit" disabled={!date || !time}>
                        Створити
                      </Button>
                    </div>
                    {appointmentException && (
                        <Alert variant={"danger"} className="mt-2 text-center">
                          Цей слот вже занято
                        </Alert>
                    )}
                    {created && (
                        <Alert variant={"success"} className="mt-2 text-center">
                          Створено
                        </Alert>
                    )}
                  </Form>
                </Container>
              </Card>
          )}
        </Row>
        <Row xs={2}>
          <DoctorFreeAppointments appointments={freeAppointments} onClickActionAppointment={onClickActionAppointment}/>
          <DoctorBusyAppointments appointments={busyAppointments} onClickActionAppointment={onClickActionAppointment}/>
        </Row>
      </Container>
  );
};