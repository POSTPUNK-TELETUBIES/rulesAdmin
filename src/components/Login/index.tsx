import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthContext } from '../../context/auth';
import { Password } from './Password';

import { LoadingButton } from '@mui/lab';
import { AuthError } from '@supabase/supabase-js';
import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

interface LoginFields {
  email: string;
  password: string;
}

interface LoginProps {
  singUpClick?: () => void;
  isSingUpAvailable?: boolean;
}

function useLogin() {
  const authClient = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      const response = await authClient.login(email, password);
      navigate('/admin');
      return response;
    } catch (error) {
      const { message } = error as AuthError;
      enqueueSnackbar('Credenciales inválidas', {
        variant: 'error',
        autoHideDuration: 3000,
      });
      return message;
    }
  }

  return login;
}

export function Login({ singUpClick, isSingUpAvailable }: LoginProps) {
  const { handleSubmit, register, resetField } = useForm();
  const login = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const _handleSubmit: SubmitHandler<LoginFields> = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      resetField('password');
      try {
        // Call your login function here
        const res = await login(email, password);
        signIn({
          token: res.data.token,
          expiresIn: res.data.expiresIn,
          tokenType: 'Bearer',
          authState: res.data.authUserState,
          refreshToken: res.data.refreshToken,
          refreshTokenExpireIn: res.data.refreshTokenExpireIn,
        });
        navigate('/admin');
      } catch (error) {
        const { message } = error as AuthError;
        enqueueSnackbar('Credenciales inválidas', {
          variant: 'error',
          autoHideDuration: 3000,
        });
        return message;
      }
      setIsLoading(false);
    },
    [login, resetField, signIn]
  );

  return (
    <Stack
      component={'form'}
      onSubmit={handleSubmit(_handleSubmit)}
      spacing={2}
    >
      <Box display='flex' justifyContent='center'>
        <Avatar sx={{ width: 80, height: 80 }} />
      </Box>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'email'}>Correo Electronico</InputLabel>
        <OutlinedInput
          id='email'
          label='Correo Electronico'
          inputProps={register('email')}
        />
      </FormControl>
      <Password disabled={isLoading} inputProps={register('password')} />
      <LoadingButton
        type='submit'
        variant='contained'
        disabled={isLoading}
        loading={isLoading}
      >
        Iniciar Sesión
      </LoadingButton>
      {isSingUpAvailable && (
        <Typography align='center'>
          ¿Aún no te registras? <Link onClick={singUpClick}>Registrate</Link>{' '}
        </Typography>
      )}
    </Stack>
  );
}
