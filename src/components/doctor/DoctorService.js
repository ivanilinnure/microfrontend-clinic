import React from 'react';
import axios from "axios";
import AuthService from "../../services/AuthService";
import authHeader from "../../services/AuthHeader";

const API_URL = 'http://localhost:8080/doctors';
const user = AuthService.getCurrentUser();

const resources = {

  getAllDoctors: () => {
    return axios.get(API_URL);
  },

  getDoctorById: () => {
    return axios.get(
        API_URL + `/${user.userId}`,
        {headers: authHeader()}
    )
  },

  createDoctorAppointment: (dateAndTime) => {
    return axios.post(
        API_URL + `/${user.userId}/appointments`,
        {"dateAndTime": dateAndTime},
        {headers: authHeader()}
    )
  },

  getFreeDoctorAppointments: (doctorId) => {
    return axios.get(
        API_URL + `/${doctorId}/appointments`,
        {
          params: {free: true},
          headers: authHeader()
        }).then(res => res.data.sort((a, b) => {
      return new Date(a.dateAndTime) - new Date(b.dateAndTime);
    }))
  },

  getBusyDoctorAppointments: () => {
    return axios.get(
        API_URL + `/${user.userId}/appointments`,
        {
          params: {free: false},
          headers: authHeader()
        }).then(res => res.data.sort((a, b) => {
      return new Date(a.dateAndTime) - new Date(b.dateAndTime);
    }))
  },

  getAllDoctorAppointments: doctorId => {
    return axios.get(
        API_URL + `/${doctorId}/appointments/all`,
        {
            params: {free: true},
            headers: authHeader()
        })
        .then(res => res.data.sort((a, b) => {
          return new Date(a.dateAndTime) - new Date(b.dateAndTime);
        }));
  },

  deleteAppointment: (appId) => {
    return axios.delete(
        API_URL + `/${user.userId}/appointments/${appId}/cancel`,
        {headers: authHeader()})
  }

};

const DoctorService = () => {
  return {
    ...resources,
  }
}

export default DoctorService;