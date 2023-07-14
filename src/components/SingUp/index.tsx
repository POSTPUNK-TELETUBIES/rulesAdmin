import {
  Button,
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
import type { SingUpFields } from '../../types/auth';
import { Password } from '../Login/Password';

interface SingUpProps {
  handleLoginClick?: () => void;
}

export const SingUp = ({ handleLoginClick }: SingUpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSingUp, setHasSingUp] = useState(false);
  const { register, handleSubmit } = useForm();
  const authClient = useContext(AuthContext);

  const _handleSubmit: SubmitHandler<SingUpFields> = useCallback(
    async (data) => {
      setIsLoading(true);
      await authClient.singUp(data);
      setIsLoading(false);
      setHasSingUp(true);
    },
    [authClient]
  );

  if (hasSingUp)
    return (
      <Stack>
        <Typography>
          Revisa tu correo y haz click en el enalnce de confirmacion, si ya lo
          hiciste, <Link onClick={handleLoginClick}>Logueate</Link>
        </Typography>
      </Stack>
    );

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
