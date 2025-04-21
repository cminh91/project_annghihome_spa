import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('jwt-token'); // Consistent key: 'jwt-token'
  console.log('PublicRoute isAuthenticated:', isAuthenticated);

  return isAuthenticated ? <Navigate to="/admin" /> : children;
};

export default PublicRoute;