import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@mui/material/CssBaseline";
import { createContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";

export enum ColorPalletes {
  DARK = "dark",
  LIGTH = "light",
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export const ColorModeContext = createContext({
  toggleColorMode() {
    return;
  },
});

export const ColorModeWrapper = ({ app }: { app: JSX.Element }) => {
  const [colorMode, setColorMode] = useState<ColorPalletes>(ColorPalletes.DARK);

  const colorModeOptions = useMemo(
    () => ({
      toggleColorMode() {
        setColorMode((prev) =>
          prev === ColorPalletes.DARK ? ColorPalletes.LIGTH : ColorPalletes.DARK
        );
      },
    }),
    []
  );

  return (
    <ColorModeContext.Provider value={colorModeOptions}>
      <ThemeProvider
        theme={colorMode === ColorPalletes.DARK ? darkTheme : lightTheme}
      >
        <CssBaseline />
        {app}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
