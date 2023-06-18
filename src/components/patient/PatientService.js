import React from 'react';
import axios from "axios";
import AuthService from "../../services/AuthService";
import authHeader from "../../services/AuthHeader";

const API_URL = 'http://localhost:8080/patients/';

const user = AuthService.getCurrentUser();

const getPatientById = () => {
  return axios.get(
      API_URL + user.userId,
      {headers: authHeader()});
}

const updatePatientById = (firstName, secondName, contactNumber, birthDate) => {
  return axios.put(
      API_URL + user.userId,
      {
        'id': user.userId,
        'firstName': firstName,
        'secondName': secondName,
        'contactNumber': contactNumber,
        'birthDate': birthDate,
      },
      {headers: authHeader()});
}

const getPatientAppointments = () => {
  return axios.get(
      API_URL + user.userId + `/appointments`,
      {headers: authHeader()})
}

const makePatientAppointment = (appId) => {
  return axios.post(
      API_URL + user.userId + `/appointments/${appId}`,
      {},
      {headers: authHeader()}
  )
}

const cancelPatientAppointment = (appId) => {
  return axios.put(
      API_URL + user.userId + `/appointments/${appId}/cancel`,
      {headers: authHeader()})
}

const PatientService = {
  getPatientById,
  updatePatientById,
  getPatientAppointments,
  makePatientAppointment,
  cancelPatientAppointment
}

export default PatientService;