import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AuthContext, defaultValue } from "../../context/auth";
import { AuthClient } from "../../types/fetchClient";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    defaultValue.checkAuth().then((data) => {
      setIsLogged(!!data?.user?.id);
      setIsLoading(false);
    });
  }, []);

  const value: AuthClient = useMemo(
    () => ({
      isLogged,
      isLoading,
      async login(email, password) {
        const data = await defaultValue.login(email, password);
        setIsLogged(true);
        return data;
      },
      async checkAuth(token?, refreshToken?) {
        return await defaultValue.checkAuth(token, refreshToken);
      },
      async singUp(data) {
        await defaultValue.singUp(data);
      },
    }),
    [isLogged, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
