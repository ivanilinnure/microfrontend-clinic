import React from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ProfileCard} from "../profile/ProfileCard";
import {DoctorInfo} from "./DoctorInfo";
import {DoctorFreeAppointments} from "./DoctorFreeAppointments";
import {DoctorBusyAppointments} from "./DoctorBusyAppointments";

const DoctorEntity = ({doctor, number, id}) => {

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/doctors/${id}/schedule`;
    navigate(path, {state: {doctorId: id, doctor: doctor}});
  }

  return (
      // <Container className="container mt-3">
      //     <Row lg={3} md={2} sm={1}>
      //         <ProfileCard/>
      //     <Row xs={2}>
      //         <DoctorFreeAppointments appointments={freeAppointments} onClickCancelAppointment={onClickCancelAppointment}/>
      //         <DoctorBusyAppointments appointments={busyAppointments} onClickCancelAppointment={onClickCancelAppointment}/>
      //     </Row>
      // </Container>

      <tr>
        <th scope="row">{id}</th>
        <td colSpan="2">{doctor.firstName + " " + doctor.secondName}</td>
        <td>{doctor.contactNumber}</td>
        <td><Button variant="primary" onClick={routeChange}>Schedule</Button></td>
      </tr>
/*
      <li className="list-group-item">
        <div className="row">
          <div className="col-4"><span>Full name: {doctor.firstName + " " + doctor.secondName}</span></div>
          <div className="col-3"><span>Phone number: {doctor.contactNumber}</span></div>
          <div className="col-5">
            <div className="d-grid justify-content-end">
              <button type="button" className="btn btn-primary" onClick={routeChange}>Schedule</button>
            </div>
          </div>
        </div>
      </li>
*/
  );
};

export default DoctorEntity;