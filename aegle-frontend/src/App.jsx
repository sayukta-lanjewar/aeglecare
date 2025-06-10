import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import AppointmentBooking from './pages/AppointmentBooking';
import DoctorProfile from './pages/DoctorProfile';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book-appointment" 
              element={
                <ProtectedRoute role="patient">
                  <AppointmentBooking />
                </ProtectedRoute>
              } 
            />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route 
              path="/payment" 
              element={
                <ProtectedRoute role="patient">
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;