import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect to appropriate dashboard based on user role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin-dashboard\" replace />;
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />;
      case 'patient':
        return <Navigate to="/patient-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;