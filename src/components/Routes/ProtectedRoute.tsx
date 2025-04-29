// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: any) => state.auth?.isAuthenticated);

  console.log('isAuthenticated:', isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;