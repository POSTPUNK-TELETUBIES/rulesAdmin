import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
import { useLogin } from '../../hooks/auth';
import { LoadingButton } from '@mui/lab';
import { Password } from './Password';
import { loginSchema } from './loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';

interface LoginProps {
  singUpClick?: () => void;
  isSingUpAvailable?: boolean;
}

const parseErrors = (errors: Record<string, any>) =>
  Object.entries(errors)
    .filter(([, value]) => value && value.message)
    .map(([fieldName, value]) => `${fieldName}: ${value.message}`)
    .join('\n');

export function Login({ singUpClick, isSingUpAvailable }: LoginProps) {
  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { data, setLoginInfo, isFetching: isLoading, error } = useLogin();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = ({ email, password }) => {
    setLoginInfo({ email, password });
    resetField('password');
  };

  useEffect(() => {
    if (!error && data) navigate('/admin');
  }, [error, data, navigate]);

  useEffect(() => {
    if (Object.values(errors).some(Boolean))
      enqueueSnackbar({
        message: parseErrors(errors),
        variant: 'error',
      });
  }, [errors, enqueueSnackbar]);

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} spacing={2}>
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
