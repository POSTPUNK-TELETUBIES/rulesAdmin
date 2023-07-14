import { Box } from '@mui/material';
import imgError404 from '../../public/error404.webp';

const NotFound = () => {
  return (
    <Box
      flexGrow={1}
      sx={{
        backgroundImage: `url(${imgError404})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      display={'flex'}
    >
      <Box
        width={'100%'}
        sx={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.85), rgba(0,0,0,0.2))',
        }}
      />
    </Box>
  );
};
export default NotFound;
