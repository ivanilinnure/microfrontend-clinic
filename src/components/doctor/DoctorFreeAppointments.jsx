import React from 'react';
import {DoctorAppointmentsView} from "./DoctorAppointmentsView";
import {Card, Col} from "react-bootstrap";

export const DoctorFreeAppointments = ({appointments, onClickActionAppointment}) => {
  return (
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Вільні прийоми:</Card.Title>
            <DoctorAppointmentsView appointments={appointments} free={true}
                                    onClickActionAppointment={onClickActionAppointment}
            />
          </Card.Body>
        </Card>
      </Col>
  )
}