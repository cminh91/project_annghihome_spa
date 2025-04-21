import { Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt-token'); // Consistent key: 'jwt-token'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default PrivateRoute;