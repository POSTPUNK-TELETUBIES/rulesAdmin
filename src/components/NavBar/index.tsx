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
import { SxProps, useTheme } from '@mui/material/styles';
import { LightMode, Logout, ModeNight } from '@mui/icons-material';
import { Status } from './status';
import { AuthContext } from '../../context/auth';

// TODO: Planear pasar a layout
export const NavBar = () => {
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
      <AppBar
        sx={{
          background: ({ palette }) =>
            `linear-gradient(90deg, ${palette.primary.main} 80%, ${palette.secondary.main} 100%)`,
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={boxStyles}>
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
          <MenuItem onClick={() => authClient.logOut()}>
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

const boxStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
};
