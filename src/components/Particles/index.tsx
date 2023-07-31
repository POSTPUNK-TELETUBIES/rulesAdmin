import { Box } from '@mui/material';
import Particles from 'react-tsparticles';

import { loadSlim } from 'tsparticles-slim';

import styles from './styles.module.css';
import { PropsWithChildren } from 'react';
import { options } from './options';

export const ParticleBg = ({ children }: PropsWithChildren) => {
  return (
    <Box className={styles.container}>
      {children}
      <Particles
        className={styles.canvasContainer}
        init={async (engine) => await loadSlim(engine)}
        options={options}
      />
    </Box>
  );
};
