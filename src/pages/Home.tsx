import { Box, Stack, Typography, Button } from '@mui/material';
import admin from '/admin.svg';
import { useCallback, useState } from 'react';

import { SxProps } from '@mui/material/styles';

import styles from './home.module.css';
import { LoginDrawer } from '../components/LoginDrawer';
import { Login } from '../components/Login';
import { SingUp } from '../components/SingUp';

if (import.meta.env.DEV && import.meta.env.VITE_IS_INTERCEPTOR_ON)
  import('../../mock/mirage').then((mockServer) => mockServer.serverInit());

interface HomeProps {
  isSingUpAvailable?: boolean;
}

export const Home = ({ isSingUpAvailable }: HomeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const _handleOpenLogin = useCallback(
    (state = true) =>
      () => {
        setIsOpen(true);
        setIsLogin(state);
      },
    []
  );

  const _handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const _handleSingUpClick = useCallback(() => {
    setIsLogin(false);
  }, []);

  const _handleLogInClick = useCallback(() => {
    setIsLogin(true);
  }, []);

  return (
    <>
      <Stack
        direction='row'
        height={'80vh'}
        spacing={2}
        gap={2}
        alignItems='center'
        justifyContent='center'
      >
        <Box sx={BoxStyles}>
          <img
            className={styles.heroImage}
            src={admin}
            alt='admin configuring panel'
          />
        </Box>
        <Stack spacing={1} width={{ sm: '100%', md: '50%' }}>
          <Typography variant='h3' component='h1'>
            Ace config and simplify SonarQube rule administration
          </Typography>
          <Typography variant='body1'>
            Effortlessly Customize SonarQube Rules for Optimal Code Quality
          </Typography>
          <Stack spacing={2} direction={{ sm: 'column', md: 'row' }}>
            {isSingUpAvailable && (
              <Button variant='contained' onClick={_handleOpenLogin(false)}>
                Sing up
              </Button>
            )}
            <Button variant='outlined' onClick={_handleOpenLogin()}>
              Log in
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <LoginDrawer
        content={
          isLogin ? (
            <Login singUpClick={_handleSingUpClick} />
          ) : (
            <SingUp handleLoginClick={_handleLogInClick} />
          )
        }
        handleClose={_handleClose}
        handleOpen={_handleOpenLogin}
        isOpen={isOpen}
      />
    </>
  );
};

const BoxStyles: SxProps = {
  width: {
    xs: '0%',
    md: '50%',
  },
  display: {
    xs: 'none',
    md: 'block',
  },
};
