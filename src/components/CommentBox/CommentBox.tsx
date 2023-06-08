import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';

export function CommentBox() {
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder='Agregar observación'
        multiline
        variant='outlined'
        sx={{ height: '100%' }}
      />
      <Box display='flex' justifyContent='flex-end' mt={1}>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          onClick={handleButtonClick}
        >
          Enviar
        </LoadingButton>
      </Box>
    </Box>
  );
}
