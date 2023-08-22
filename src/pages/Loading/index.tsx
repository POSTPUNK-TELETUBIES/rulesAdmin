import { Box, CircularProgress, Typography } from '@mui/material';
import styles from './styles.module.css';

function Loading() {
  return (
    <Box className={styles.loadingPage}>
      <Typography variant='h6'>Cargando...</Typography>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
