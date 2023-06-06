import { Box, TextField } from '@mui/material';

export function CommentBox() {
  return (
    <Box>
      <TextField
        fullWidth
        placeholder='Agregar observación'
        multiline
        variant='outlined'
        sx={{ height: '100%' }}
      />
    </Box>
  );
}
