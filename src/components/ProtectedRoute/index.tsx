import { PropsWithChildren } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  redirectPath = '/home',
}: PropsWithChildren<ProtectedRouteProps>) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectPath} />;
};
