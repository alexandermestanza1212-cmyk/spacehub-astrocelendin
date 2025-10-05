// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement; // Ensure children is a single React element
  redirectPath?: string; // Optional custom redirect path
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath = '/login' }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to the login page with the current path as a redirect parameter
  if (!isAuthenticated) {
    return <Navigate to={`${redirectPath}?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;