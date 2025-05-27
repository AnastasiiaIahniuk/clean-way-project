import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { role } = useParams();
  const currentRole = role || localStorage.getItem('userRole');

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;