import React from 'react';
import DoctorEntity from "./DoctorEntity";

const DoctorEntityList = ({doctors}) => {

  return (
      <div className="col">
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" colSpan="2">Full name</th>
            <th scope="col">Контактний номер</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {doctors.map((doctor, index) =>
              <DoctorEntity doctor={doctor} number={index + 1} key={doctor.id} id={doctor.id}/>
          )}
          </tbody>
        </table>
{/*
        <ul className="list-group">
        </ul>
*/}
      </div>
  );
};

export default DoctorEntityList;