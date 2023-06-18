import React, {useState} from "react"
import {Alert, Button, Container, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import AuthService from "../services/AuthService";
import {useNavigate} from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [birthDate, setBirthDate] = useState("")

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    await AuthService.register(email, password)
        .catch(error => {
          const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          setLoading(false);
          setMessage(resMessage);
        })

    await AuthService.postRegister(firstName, secondName, "+380" + contactNumber, birthDate)
        .then(() => {
          navigate('/profile')
          window.location.reload();
        })
        .catch(error => {
          const resMessage =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();
          setLoading(false);
          setMessage(resMessage);
        })
  }

  return (
      <Container id="auth-container" className="d-grid h-100">
        <Form id="auth-form" className="text-center p-3 w-125" onSubmit={handleSubmit}>
          <h1 className="mb-3 fs-3 fw-normal">Будь-ласка зареєструйтесь</h1>
          <FloatingLabel label="Електронна пошта" className="mb-2">
            <Form.Control required type="email" placeholder="Електронна пошта"
                          onChange={event => setEmail(event.target.value)}/>
          </FloatingLabel>
          <FloatingLabel label="Пароль" className="mb-2">
            <Form.Control required type="password" placeholder="Пароль"
                          onChange={event => setPassword(event.target.value)}/>
          </FloatingLabel>
          <FloatingLabel label="Ім'я" className="mb-2">
            <Form.Control required type="text" placeholder="Ім'я"
                          onChange={event => setFirstName(event.target.value)}/>
          </FloatingLabel>
          <FloatingLabel label="Прізвище" className="mb-2">
            <Form.Control required type="text" placeholder="Прізвище"
                          onChange={event => setSecondName(event.target.value)}/>
          </FloatingLabel>
          <InputGroup className="mb-2">
            <InputGroup.Text>+380</InputGroup.Text>
            <FloatingLabel label="Контактний номер">
              <Form.Control required type="tel" placeholder="Контактний номер"
                            onChange={event => setContactNumber(event.target.value)}/>
            </FloatingLabel>
          </InputGroup>
          <FloatingLabel label="Дата народження" className="mb-2">
            <Form.Control required type="date" placeholder="Дата народження"
                          onChange={event => setBirthDate(event.target.value)}/>
          </FloatingLabel>
          <div className="d-grid">
            <Button className="mb-3" variant="primary" size="lg" type="submit">
              {loading && (
                  <span className="spinner-border spinner-border-sm"/>
              )}
              Зареєструватись
            </Button>
          </div>
          {message && (
              <Alert variant="danger">
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
          )}
        </Form>
      </Container>
  );
}