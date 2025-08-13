import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { mockAuthService } from '@services/auth/mockAuthService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticatedMsal = useIsAuthenticated();
  const { isAuthenticated: isAuthenticatedRedux } = useAuth();
  const isMockAuthenticated = mockAuthService.isAuthenticated();

  const isAuthenticated = isAuthenticatedMsal || isAuthenticatedRedux || isMockAuthenticated;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};