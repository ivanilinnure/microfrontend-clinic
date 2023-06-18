import AuthService from "../../services/AuthService";
import {PatientProfile} from "../patient/PatientProfile";
import {DoctorProfile} from "../doctor/DoctorProfile";

export const Profile = () => {
  const user = AuthService.getCurrentUser();

  return (
      <>
      {user.authorities.includes('ROLE_PATIENT') ? (
          <PatientProfile/>
      ) : (
          <DoctorProfile/>
      )}
      </>
  )
}