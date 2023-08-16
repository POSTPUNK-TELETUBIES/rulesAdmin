import { PropsWithChildren } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';

import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({
  children,
  redirectPath = '/home',
}: PropsWithChildren<ProtectedRouteProps>) => {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated() ? <>{children}</> : <Navigate to={redirectPath} />;
};
