import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AuthContext, defaultValue } from "../../context/auth";
import { AuthClient } from "../../types/fetchClient";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    defaultValue.checkAuth().then((data) => setIsLogged(!!data?.user?.id));
  }, []);

  const value: AuthClient = useMemo(
    () => ({
      isLogged,
      async login(email, password) {
        const data = await defaultValue.login(email, password);
        setIsLogged(true);
        return data;
      },
      async checkAuth(token?, refreshToken?) {
        return await defaultValue.checkAuth(token, refreshToken);
      },
    }),
    [isLogged]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
