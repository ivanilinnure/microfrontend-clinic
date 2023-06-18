import React, {useEffect, useState} from "react";
import DoctorEntityList from "./doctor/DoctorEntityList";
import DoctorService from "./doctor/DoctorService";
import AuthService from "../services/AuthService";
import {PatientProfile} from "./patient/PatientProfile";
import {DoctorProfile} from "./doctor/DoctorProfile";

export const Home = () => {

  const user = AuthService.getCurrentUser();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    DoctorService().getAllDoctors()
        .then(result => {
          setDoctors(result.data);
        }).catch(exception => {
      console.log(exception)
    });
  }, []);

  return (
      <>
        {user.authorities.includes('ROLE_PATIENT') ? (
            <div className="row">
              <DoctorEntityList doctors={doctors}/>
            </div>
        ) : (
            <DoctorProfile/>
        )}
      </>
  );

}
