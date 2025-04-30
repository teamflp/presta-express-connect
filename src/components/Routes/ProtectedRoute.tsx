
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/professional-login" />;
};

export default ProtectedRoute;
