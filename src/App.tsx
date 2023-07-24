import { SnackbarProvider } from 'notistack';
import { ColorModeWrapper } from './theme';
import { AppRoutes } from './routes/AppRoutes';
import { Box } from '@mui/material';
import { AuthProvider } from 'react-auth-kit';

function App() {
  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
      <SnackbarProvider>
        <ColorModeWrapper>
          <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}
          >
            <AppRoutes />
          </AuthProvider>
        </ColorModeWrapper>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
