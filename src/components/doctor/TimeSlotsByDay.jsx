import {Col} from "react-bootstrap";
import {TimeSlot} from "./TimeSlot";
import React from "react";

export const TimeSlotsByDay = ({date, appointments}) => {

  const [year, month, day] = date.split('-');

  return (
      <Col className="col-md-auto">
        <p className="text-center mb-0">{day + '/' + month}</p>
        {appointments.map(appointment => {
          const day = new Date(appointment.dateAndTime).toISOString().split('T')[0]

          if (date === day) {
            return <TimeSlot key={appointment.id} day={day} appointment={appointment} />
          }
        })}
      </Col>
  )
}