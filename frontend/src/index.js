import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { DoctorDashboard } from './components/Dashboards/DoctorDashboard';
import { PatientDashboard } from './components/Dashboards/PatientDashboard';
import { InsuranceDashboard } from './components/Dashboards/InsuranceDashboard';
import { ErrorPage } from './components/ErrorPage';
import NewPatientRegistration from './components/Dashboards/NewPatientRegistration';
import MedicalRecordForm from './components/Dashboards/createMedicalRecord';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} /> 
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} /> 
      <Route path="/patient-dashboard/:id" element={<PatientDashboard />} /> 
      <Route path="/insurance-dashboard" element={<InsuranceDashboard />} /> 
      <Route path="/error-page" element={<ErrorPage />} /> 
      <Route path="/new-patient-registration" element={<NewPatientRegistration />} />
      <Route path="/create-medical-record/:id" element={<MedicalRecordForm />} />
      {/* Add more routes as you build components */}
    </Routes>
  </BrowserRouter>
);
