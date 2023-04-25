import { AppBar, Container, Stack, Switch, Toolbar } from "@mui/material";
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
          <img
            src="https://www.pacifico.com.pe/image/layout_set_logo?img_id=26556784&t=1682438787127"
            alt="logo de pacifico seguros"
          />
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
