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
import { Status } from "./status";

// TODO: Planear pasar a layout
export const NavBar = () => {
  const { palette } = useTheme();
  const colorMode = useContext(ColorModeContext);

  const _handleChange = useCallback(() => {
    colorMode.toggleColorMode();
  }, [colorMode]);

  return (
    <AppBar
      sx={{
        background: ({ palette }) =>
          `linear-gradient(90deg, ${palette.primary.main} 80%, ${palette.secondary.main} 100%)`,
      }}
    >
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
            <Typography variant="h6" fontWeight={900}>
              Sonardash
            </Typography>
            <Typography variant="body1">/ Gestión de Reglas</Typography>
            <img
              src="https://www.pacifico.com.pe/image/layout_set_logo?img_id=26556784&t=1682438787127"
              alt="logo de pacifico seguros"
            />
          </Box>
          <Status />
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
