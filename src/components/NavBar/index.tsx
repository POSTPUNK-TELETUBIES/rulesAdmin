import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
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

// TODO: Planear pasar a layout
export const NavBar = () => {
  const { palette } = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { isLogged, user } = useContext(AuthContext);
  const [anchorRef, setAnchorRef] = useState(null);

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
      <AppBar
        sx={{
          background: ({ palette }) =>
            `linear-gradient(90deg, ${palette.primary.main} 80%, ${palette.secondary.main} 100%)`,
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant='h6' fontWeight={900}>
                Sonardash
              </Typography>
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
              <Avatar
                variant='circular'
                component={Button}
                onClick={_handleClick}
              >
                {user.email[0]}
              </Avatar>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Menu open={!!anchorRef} anchorEl={anchorRef} onClose={_handleClose}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </ListItem>
        </List>
      </Menu>
    </>
  );
};
