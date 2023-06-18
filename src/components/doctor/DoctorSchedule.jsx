import React, {useEffect, useState} from 'react'
import {Card, Col, Container, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import DoctorService from "./DoctorService";
import {TimeSlotsByDay} from "./TimeSlotsByDay";
import {DoctorFreeAppointments} from "./DoctorFreeAppointments";
import AuthService from "../../services/AuthService";
import PatientService from "../patient/PatientService";

export const  DoctorSchedule = () => {
  const location = useLocation();
  const { doctorId, doctor } = location.state;

  const [freeAppointments, setFreeAppointments] = useState([]);
  const [daysWithAppointments, setDaysWithAppointments] = useState([]);

  useEffect(() => {
    DoctorService().getFreeDoctorAppointments(doctorId)
        .then(res => setFreeAppointments(res))
        .catch(error => console.log(error));
  }, []);

  const onClickActionAppointment = async e => {
    await PatientService.makePatientAppointment(e.target.value)
        .catch(error => console.log(error))
    await updateAppointments();
  }

  const updateAppointments = () => {
    DoctorService().getFreeDoctorAppointments(doctorId)
        .then(res => setFreeAppointments(res))
        .catch(error => console.log(error))
  }

  return (
      <Container className="container mt-3">
        <Col>
          <Row lg={2} sm={1}>

            <Col className="mb-3">
              <Card>
                <Card.Body>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={require("../../assets/images/patient.png")}
                         alt="Patient" className="rounded-circle"
                         width="200"/>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col className="my-auto">
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <h6>Ім'я</h6>
                    </Col>
                    <Col sm={7} className="text-secondary">
                      {doctor.firstName}
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col>
                      <h6>Прізвище</h6>
                    </Col>
                    <Col sm={7} className="text-secondary">
                      {doctor.secondName}
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col>
                      <h6>Контактний номер</h6>
                    </Col>
                    <Col sm={7} className="text-secondary">
                      {doctor.contactNumber}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <Row>
            <h3 className="mt-2 text-center">Розклад доктора</h3>
          </Row>

          <Row lg={7} sm={3}>
            {daysWithAppointments.map((date, index) =>
                <TimeSlotsByDay key={index + 1} date={date} appointments={freeAppointments} />
            )}
          </Row>
        </Col>
        <Row xs={1}>
          <DoctorFreeAppointments appointments={freeAppointments} onClickActionAppointment={onClickActionAppointment}/>
        </Row>
      </Container>
  )
}
