import {
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
import { Person } from '@mui/icons-material';

import { LoadingButton } from '@mui/lab';
import { AuthError } from '@supabase/supabase-js';
import { useSnackbar } from 'notistack';

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

  async function login(email: string, password: string) {
    try {
      await authClient.login(email, password);
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

  const _handleSubmit: SubmitHandler<LoginFields> = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      resetField('password');
      login(email, password);
      setIsLoading(false);
    },
    [login, resetField]
  );

  return (
    <Stack
      component={'form'}
      onSubmit={handleSubmit(_handleSubmit)}
      spacing={2}
      p={2}
    >
      <Box display='flex' justifyContent='center'>
        <Person
          sx={{
            fontSize: '10vh',
            borderRadius: '50%',
            border: '2px solid gray',
          }}
        />
      </Box>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'email'}>Email</InputLabel>
        <OutlinedInput
          id='email'
          label='Email'
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
        Login
      </LoadingButton>
      {isSingUpAvailable && (
        <Typography align='center'>
          ¿Aún no te registras? <Link onClick={singUpClick}>Sing up</Link>{' '}
        </Typography>
      )}
    </Stack>
  );
}
