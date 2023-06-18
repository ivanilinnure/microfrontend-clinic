import {Button, Card, Col, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {PatientProfile} from "../patient/PatientProfile";
import {DoctorProfile} from "./DoctorProfile";
import AuthService from "../../services/AuthService";

export const DoctorAppointmentsView = ({appointments, free, onClickActionAppointment}) => {
  const [border, setBorder] = useState('')
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (free) {
      setBorder("info")
    } else {
      setBorder("danger")
    }
  }, [])

  return (
      <>
        {user.authorities.includes('ROLE_PATIENT') ? (
            <Row md={1} lg={2}>
              {appointments.map(appointment =>
                  <Col key={appointment.id}>
                    <Card border={border} bg={"light"} className="mb-2">
                      <Card.Body>
                        <div className="mt-2">
                          <strong>Доктор: </strong> {appointment.doctor.firstName + " " + appointment.doctor.secondName}
                        </div>
                        {!free && (
                            <div className="mt-2">
                              <strong>Пацієнт: </strong> {appointment.patient.firstName + " " + appointment.patient.secondName}
                            </div>
                        )}
                        <div className="mt-2">
                          <strong>Дата: </strong> {new Date(appointment.dateAndTime).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <strong>Час: </strong> {new Date(appointment.dateAndTime).toLocaleTimeString()}
                        </div>
                        <div className="mt-2">
                          <Button variant={"primary"} value={appointment.id}
                                  onClick={onClickActionAppointment}>Погодити</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
              )}
            </Row>
        ) : (
            <Row md={1} lg={2}>
              {appointments.map(appointment =>
                  <Col key={appointment.id}>
                    <Card border={border} bg={"light"} className="mb-2">
                      <Card.Body>
                        <div className="mt-2">
                          <strong>Доктор: </strong> {appointment.doctor.firstName + " " + appointment.doctor.secondName}
                        </div>
                        {!free && (
                            <div className="mt-2">
                              <strong>Пацієнт: </strong> {appointment.patient.firstName + " " + appointment.patient.secondName}
                            </div>
                        )}
                        <div className="mt-2">
                          <strong>Дата: </strong> {new Date(appointment.dateAndTime).toLocaleDateString()}
                        </div>
                        <div className="mt-2">
                          <strong>Час: </strong> {new Date(appointment.dateAndTime).toLocaleTimeString()}
                        </div>
                        <div className="mt-2">
                          <Button variant={"danger"} value={appointment.id}
                                  onClick={onClickActionAppointment}>Відмінити</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
              )}
            </Row>
        )}
      </>
  )
}