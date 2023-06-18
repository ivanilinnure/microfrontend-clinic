import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Register} from "./components/Register";
import {Login} from "./components/Login";
import {Home} from "./components/Home";
import {Header} from "./components/navbar/Header";
import {Profile} from "./components/profile/Profile";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import AuthService from "./services/AuthService";
import {DoctorSchedule} from "./components/doctor/DoctorSchedule";

const App = () => {

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  }

  return (
      <Router>
        <Header currentUser={currentUser} handleLogOut={handleLogOut}/>
        <Container>
          <Routes>
            <Route path='/register' exact={true} element={<Register/>}/>
            <Route path='/login' exact={true} element={<Login/>}/>
            <Route path='/home' exact={true} element={<Home/>}/>
            <Route path='/profile' exact={true} element={<Profile/>}/>
            <Route path='/doctors/:id/schedule' exact={true} element={<DoctorSchedule id="id"/>}/>
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
