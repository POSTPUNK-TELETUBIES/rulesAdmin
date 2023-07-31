import { Box, Typography } from '@mui/material';

import styles from './styles.module.css';

function Loading() {
  return (
    <Box className={styles.loadingPage}>
      <Typography>Cargando...</Typography>
    </Box>
  );
}

export default Loading;
