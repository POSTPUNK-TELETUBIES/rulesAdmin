import {
  Button,
  FormControl,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import type { SingUpFields } from '../../types/auth';
import { Password } from '../Login/Password';
import { useSignUp } from '../../hooks/auth';

interface SingUpProps {
  handleLoginClick?: () => void;
}

export const SingUp = ({ handleLoginClick }: SingUpProps) => {
  const { register, handleSubmit } = useForm();
  const { setRegisterInfo, isFetching: isLoading } = useSignUp();

  const _handleSubmit: SubmitHandler<SingUpFields> = useCallback((data) => {
    setRegisterInfo(data);
  }, []);

  return (
    <Stack component='form' onSubmit={handleSubmit(_handleSubmit)} spacing={2}>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'email'}>Email</InputLabel>
        <OutlinedInput
          id='email'
          label='Email'
          inputProps={register('email')}
        />
      </FormControl>
      <Password inputProps={register('password')} />
      <Password
        id='confirmPassword'
        label='Confirm Password'
        inputProps={register('confirmPassword')}
      />
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'username'}>Username</InputLabel>
        <OutlinedInput
          id='username'
          label='Username'
          inputProps={register('username')}
        />
      </FormControl>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'lastName'}>Apellido</InputLabel>
        <OutlinedInput
          id='lastName'
          label='Apellido'
          inputProps={register('lastName')}
        />
      </FormControl>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={'firstName'}>Nombre</InputLabel>
        <OutlinedInput
          id='firstName'
          label='Nombre'
          inputProps={register('firstName')}
        />
      </FormControl>
      <Button type='submit' variant='contained'>
        Sing up
      </Button>
      <Typography align='center'>
        ¿Ya tienes cuenta? <Link onClick={handleLoginClick}>Log in</Link>
      </Typography>
    </Stack>
  );
};
