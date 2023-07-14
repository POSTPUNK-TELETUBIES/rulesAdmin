import { Stack, Button, Box, Grid } from '@mui/material';
import { useCallback, useState } from 'react';
import { LoginDrawer } from '../components/LoginDrawer';
import { Login } from '../components/Login';
import { SingUp } from '../components/SingUp';
import styles from './home.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
      <Grid container columns={{ xs: 6, md: 12 }} className={styles.container}>
        <Grid item xs={6} className={styles.imgContainer}>
          <LazyLoadImage
            src='admin3.webp'
            className={styles.img}
            alt='chica sujetando en sus manos una laptop de colo negra'
            effect='blur'
            width='100%'
          />
        </Grid>

        {/* BLOQUE 2 */}
        <Grid item xs={6}>
          <Box p={{ xs: 3, sm: 8, lg: 14 }} className={styles.textContainer}>
            <h2 className={styles.title}>
              Administración de reglas de SonarQube
            </h2>
            <h3 className={styles.subtitle}>
              Personalize y configure sin esfuerzo para optimizar la calidad del
              codigo.
            </h3>
            <Stack
              gap={2}
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
