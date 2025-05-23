import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role, allowedRoles }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;