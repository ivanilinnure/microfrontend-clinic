import {Alert, Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import PatientService from "./PatientService";

export const PatientInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [firstNameException, setFirstNameException] = useState(false);

  const [newSecondName, setNewSecondName] = useState("");
  const [secondNameException, setSecondNameException] = useState(false);

  const [newContactNumber, setNewContactNumber] = useState("");
  const [contactNumberException, setContactNumberException] = useState(false);

  const [newBirthDate, setNewBirthDate] = useState("");
  const [birthDateException, setBirthDateException] = useState(false);

  const numberRegExp = new RegExp("^(?:\\+38)?(0\\d{9})$")

  useEffect(() => {
        PatientService.getPatientById()
            .then(res => {
              setFirstName(res.data.firstName);
              setSecondName(res.data.secondName);
              setContactNumber(res.data.contactNumber);
              setBirthDate(res.data.birthDate);
            })
            .catch(error => {
                  console.log(error)
                }
            );
      }, []
  );

  const handleEditModeTrue = e => {
    e.preventDefault();
    setNewFirstName(firstName)
    setNewSecondName(secondName)
    setNewContactNumber(contactNumber)
    setNewBirthDate(birthDate)
    setFirstNameException(false)
    setSecondNameException(false)
    setContactNumberException(false)
    setBirthDateException(false)
    setEditMode(true)
  };

  const handleEditModeFalse = async e => {
    e.preventDefault();
    let anyException = false
    if (!newContactNumber || !numberRegExp.test(newContactNumber)) {
      setContactNumberException(true)
      anyException = true
    }
    if (!newFirstName) {
      setFirstNameException(true)
      anyException = true
    }
    if (!newSecondName) {
      setSecondNameException(true)
      anyException = true
    }
    if (new Date(newBirthDate) > new Date()) {
      setBirthDateException(true)
      anyException = true
    }
    if (anyException) {
      return;
    }
    await PatientService.updatePatientById(newFirstName, newSecondName, newContactNumber, newBirthDate)
        .then(res => {
          setFirstName(res.data.firstName);
          setSecondName(res.data.secondName);
          setContactNumber(res.data.contactNumber);
          setBirthDate(res.data.birthDate);
        })
        .catch(error => {
          console.log(error)
        });
    setEditMode(false)
  };

  return (
      <div className="col-md-8">
        <div className="card mb-1">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Ім'я</h6>
              </div>
              {editMode ? (
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control"
                           value={newFirstName}
                           onChange={event => setNewFirstName(event.target.value)}/>
                    {firstNameException && (
                        <Alert className="mt-3" variant="danger">
                          Invalid first name
                        </Alert>
                    )}
                  </div>
              ) : (
                  <div className="col-sm-9 text-secondary">
                    {firstName}
                  </div>
              )}
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Прізвище</h6>
              </div>
              {editMode ? (
                  <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control"
                           value={newSecondName}
                           onChange={event => setNewSecondName(event.target.value)}/>
                    {secondNameException && (
                        <Alert className="mt-3" variant="danger">
                          Invalid second name
                        </Alert>
                    )}
                  </div>
              ) : (
                  <div className="col-sm-9 text-secondary">
                    {secondName}
                  </div>
              )}
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Контактний номер</h6>
              </div>
              {editMode ? (
                  <div className="col-sm-9 text-secondary">
                    <input type="tel" className="form-control"
                           value={newContactNumber}
                           onChange={event => setNewContactNumber(event.target.value)}/>
                    {contactNumberException && (
                        <Alert className="mt-3" variant="danger">
                          Invalid phone number.
                          Correct format: +380XXXXXXX
                        </Alert>
                    )}
                  </div>
              ) : (
                  <div className="col-sm-9 text-secondary">
                    {contactNumber}
                  </div>
              )}
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Дата народження</h6>
              </div>
              {editMode ? (
                  <div className="col-sm-9 text-secondary">
                    <input type="date" className="form-control"
                           value={newBirthDate}
                           onChange={event => setNewBirthDate(event.target.value)}/>
                    {birthDateException && (
                        <Alert className="mt-3" variant="danger">
                          Invalid birth date.
                        </Alert>
                    )}
                  </div>
              ) : (
                  <div className="col-sm-9 text-secondary">
                    {new Date(birthDate).toLocaleDateString()}
                  </div>
              )}
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-12">
                {editMode ? (
                    <Button variant="success" onClick={handleEditModeFalse}>
                      Save changes
                    </Button>
                ) : (
                    <Button onClick={handleEditModeTrue}>
                      Редагувати
                    </Button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}