import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@mui/material/CssBaseline";
import { createContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";

export enum ColorPalletes {
  DARK = "dark",
  LIGTH = "light",
}

const globals = {
  fontFamily: ["Foco"].join(","),
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  ...globals,
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0099CC",
    },
    secondary: {
      main: "#EE2C70",
    },
  },
  ...globals,
});

export const ColorModeContext = createContext({
  toggleColorMode() {
    return;
  },
});

export const ColorModeWrapper = ({ app }: { app: JSX.Element }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [colorMode, setColorMode] = useState<ColorPalletes>(
    (localStorage.getItem("mode") as ColorPalletes) ||
      (!prefersDarkMode ? ColorPalletes.DARK : ColorPalletes.LIGTH)
  );

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

  useEffect(() => {
    localStorage.setItem("mode", colorMode);
  }, [colorMode]);

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
