import {
  AppBar,
  Box,
  Container,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { ColorModeContext, ColorPalletes } from "../../theme";
import { useTheme } from "@mui/material/styles";
import { LightMode, ModeNight } from "@mui/icons-material";

// TODO: Planear pasar a layout
export const NavBar = () => {
  const { palette } = useTheme();
  const colorMode = useContext(ColorModeContext);

  const _handleChange = useCallback(() => {
    colorMode.toggleColorMode();
  }, [colorMode]);

  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="body2">Sonardash - Reglas</Typography>
            <img
              src="https://www.pacifico.com.pe/image/layout_set_logo?img_id=26556784&t=1682438787127"
              alt="logo de pacifico seguros"
            />
          </Box>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {palette?.mode === ColorPalletes.DARK ? (
              <ModeNight />
            ) : (
              <LightMode />
            )}
            <Switch color="warning" onChange={_handleChange} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
