import React, {useEffect, useState} from "react";
import {Button, Col, Modal, Row} from "react-bootstrap";
import PatientService from "../patient/PatientService";

export const TimeSlot = ({day, appointment}) => {
  const [isFree, setIsFree] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const patient = appointment.patient;

    if (patient === null) {
      setIsFree(true);
    }
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    PatientService.makePatientAppointment(appointment.id).then(() => {
          setShow(false);
          setIsFree(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  const date = new Date(appointment.dateAndTime);
  const [hour, minutes] = [date.getHours(), date.getMinutes()];
  const time = hour + ':' + (minutes < 10 ? ('0' + minutes) : minutes);

  return (
      <div className="col-md-auto mt-2 mx-2">
        <div className="row">
          <Button variant={isFree ? "outline-primary" : "primary"}
                  onClick={handleShow}
                  disabled={!isFree}
          >
            {time}
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{day + ' ' + time}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to make an appointment with the doctor?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
  )
}