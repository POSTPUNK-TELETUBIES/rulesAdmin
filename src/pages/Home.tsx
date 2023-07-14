import { Stack, Typography, Button, Box, Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { LoginDrawer } from '../components/LoginDrawer';
import { Login } from '../components/Login';
import { SingUp } from '../components/SingUp';

interface HomeProps {
  isSingUpAvailable?: boolean;
}

const Home = ({ isSingUpAvailable }: HomeProps) => {
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
      <Grid container flexGrow={1} width={'100%'} columns={{ xs: 6, md: 12 }}>
        <Grid
          item
          xs={6}
          display={{ xs: 'none', md: 'inherit' }}
          alignContent={'center'}
          sx={{
            backgroundImage: 'url(\'/public/admin2.jpg\')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={6}>
          <Box
            height={'100%'}
            p={{ xs: 3, sm: 8, lg: 14 }}
            gap={2}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Typography
              fontSize={{ xs: '30px', sm: '40px', md: '40px', lg: '45px' }}
              component='h1'
              textAlign={{ xs: 'center', md: 'left' }}
              fontWeight={'bold'}
            >
              Administración de reglas de SonarQube
            </Typography>
            <Typography
              variant='body1'
              fontSize={{ xs: '16px', sm: '20px', md: '22px' }}
              textAlign={{ xs: 'center', md: 'left' }}
              color={'gray'}
            >
              Personalize y configure sin esfuerzo para optimizar la calidad del
              codigo.
            </Typography>
            <Stack
              spacing={2}
              direction={{ sm: 'column', md: 'row' }}
              marginTop={{ xs: 2, sm: 4 }}
            >
              {isSingUpAvailable && (
                <Button variant='contained' onClick={_handleOpenLogin(false)}>
                  Registrate
                </Button>
              )}
              <Button
                variant='outlined'
                onClick={_handleOpenLogin()}
                sx={{ px: 6 }}
                style={{ alignSelf: 'center', width: 'max-content' }}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

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

export default Home;
