import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { MouseEvent, useCallback, useContext, useState } from 'react';
import { ColorModeContext, ColorPalletes } from '../../theme';
import { useTheme } from '@mui/material/styles';
import { LightMode, Logout, ModeNight } from '@mui/icons-material';
import { Status } from './status';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// TODO: Planear pasar a layout
export const NavBar = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { isLogged, user } = useContext(AuthContext);
  const [anchorRef, setAnchorRef] = useState(null);
  const authClient = useContext(AuthContext);

  const _handleChange = useCallback(
    () => colorMode.toggleColorMode(),
    [colorMode]
  );

  const _handleClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      setAnchorRef(currentTarget);
    },
    []
  );

  const _handleClose = useCallback(() => {
    setAnchorRef(null);
  }, []);

  return (
    <>
      <AppBar position='sticky' className={styles.header}>
        <LazyLoadImage
          src='BannerDegrade.webp'
          style={{ background: 'green', top: '0' }}
          className={styles.bg}
          effect='blur'
        />
        <Container sx={{ py: 2 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box gap={{ xs: 0, sm: 1 }} className={styles.title}>
              <Box display={'flex'} gap={1} alignItems={'center'}>
                <LazyLoadImage
                  src='logo.webp'
                  effect='blur'
                  alt='logo de pacifico'
                  className={styles.logo}
                  style={{ display: 'flex' }}
                />
                <Typography
                  variant='h6'
                  fontWeight={900}
                  fontSize={{ xs: '1.4rem', sm: '1.6rem' }}
                >
                  Sonardash
                </Typography>
              </Box>
              <Typography variant='body1'>/ Gestión de Reglas</Typography>
            </Box>
            {isLogged && <Status />}
            <Stack direction='row' justifyContent='center' alignItems='center'>
              {palette?.mode === ColorPalletes.DARK ? (
                <ModeNight />
              ) : (
                <LightMode />
              )}
              <Switch color='warning' onChange={_handleChange} />
              {isLogged && (
                <Button sx={{ borderRadius: '50%' }} onClick={_handleClick}>
                  <Avatar sx={{ width: 40, height: 40 }} variant='circular'>
                    {user?.email[0]}
                  </Avatar>
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Menu open={!!anchorRef} anchorEl={anchorRef} onClose={_handleClose}>
        <List>
          <MenuItem
            onClick={() => {
              authClient.logOut();
              _handleClose();
              navigate('home');
            }}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </List>
      </Menu>
    </>
  );
};
