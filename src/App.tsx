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
          <AuthProvider authType={'localstorage'} authName={'_auth'}>
            <AppRoutes />
          </AuthProvider>
        </ColorModeWrapper>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
