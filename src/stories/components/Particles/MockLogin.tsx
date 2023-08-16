import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { Password } from '../../../components/Login/Password';

import { darkTheme } from '../../../theme';

export const MockLogin = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Stack>
      <Password />
    </Stack>
  </ThemeProvider>
);
