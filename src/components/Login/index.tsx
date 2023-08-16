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
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Password } from './Password';

import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/auth';

interface LoginFields {
  email: string;
  password: string;
}

interface LoginProps {
  singUpClick?: () => void;
  isSingUpAvailable?: boolean;
}

export function Login({ singUpClick, isSingUpAvailable }: LoginProps) {
  const { handleSubmit, register, resetField } = useForm();
  const { data, setLoginInfo, isFetching: isLoading, error } = useLogin();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const _handleSubmit: SubmitHandler<LoginFields> = useCallback(
    async ({ email, password }) => {
      setLoginInfo({ email, password });
      resetField('password');
    },
    [resetField, setLoginInfo]
  );

  useEffect(() => {
    if (error)
      enqueueSnackbar({
        message: 'Credenciales invalidas',
        variant: 'error',
      });
  }, [enqueueSnackbar, error]);

  useEffect(() => {
    if (!error && data) navigate('/admin');
  }, [error, data, navigate]);

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
