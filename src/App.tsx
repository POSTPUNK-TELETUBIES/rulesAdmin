import { SnackbarProvider } from 'notistack';
import { ColorModeWrapper } from './theme';
import { AppRoutes } from './routes/AppRoutes';
import { Box } from '@mui/material';

function App() {
  return (
    <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
      <SnackbarProvider>
        <ColorModeWrapper>
          <AppRoutes />
        </ColorModeWrapper>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
