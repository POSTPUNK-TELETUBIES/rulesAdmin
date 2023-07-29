import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SupabaseAuthSingleton } from '../lib/service/supabaseAuth';

import { supabaseClient } from '../lib/modules/supabase';
import { useSignIn, useSignOut } from 'react-auth-kit';

import { SingUpFields } from '../types/auth';

const authClient = SupabaseAuthSingleton.getInstance(supabaseClient.auth);

export function useLogin() {
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>();
  const signIn = useSignIn();

  const reactQueryData = useQuery(
    ['login'],
    async () => {
      const data = await authClient.login(
        loginInfo?.email,
        loginInfo?.password
      );
      signIn({
        expiresIn: data.session.expires_in,
        token: data.session.access_token,
        tokenType: data.session.token_type,
        authState: data.user,
      });

      return data;
    },
    {
      enabled: !!loginInfo,
    }
  );

  return {
    ...reactQueryData,
    setLoginInfo,
  };
}

export function useSignUp() {
  const [registerInfo, setRegisterInfo] = useState<SingUpFields>();

  const reactQueryData = useQuery(
    ['register', registerInfo],
    () => authClient.singUp(registerInfo),
    {
      enabled: !!registerInfo,
    }
  );

  return {
    ...reactQueryData,
    setRegisterInfo,
  };
}

export function useLogout() {
  const signOut = useSignOut();

  return () => {
    authClient.logOut();
    signOut();
  };
}
