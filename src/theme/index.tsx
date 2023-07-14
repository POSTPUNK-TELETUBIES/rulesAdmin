import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@mui/material/CssBaseline';
import { createContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';

export enum ColorPalletes {
  DARK = 'dark',
  LIGTH = 'light',
}

const typographyGlobals = {
  fontFamily: ['Foco'].join(','),
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    ...typographyGlobals,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0099CC',
    },
    secondary: {
      main: '#EE2C70',
    },
  },
  typography: {
    ...typographyGlobals,
  },
});

export const ColorModeContext = createContext({
  toggleColorMode() {
    return;
  },
});

export const ColorModeWrapper = ({ children }: { children: JSX.Element }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [colorMode, setColorMode] = useState<ColorPalletes>(
    (localStorage.getItem('mode') as ColorPalletes) ||
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
    localStorage.setItem('mode', colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={colorModeOptions}>
      <ThemeProvider
        theme={colorMode === ColorPalletes.DARK ? darkTheme : lightTheme}
      >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
