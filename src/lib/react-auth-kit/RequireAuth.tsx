// RequireAuth.tsx

import { useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

type RequireAuthProps = {
  redirectPath: string;
};

const RequireAuth = ({
  redirectPath,
  children,
}: PropsWithChildren<RequireAuthProps>) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(redirectPath);
    }
  }, [navigate, isAuthenticated, redirectPath]);

  return children;
};

export default RequireAuth;
