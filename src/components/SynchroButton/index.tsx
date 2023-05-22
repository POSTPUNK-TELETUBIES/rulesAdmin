import { Sync } from '@mui/icons-material';
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Button,
  Modal,
  Typography,
  Box,
} from '@mui/material';
import { useSynchro } from '../../hooks';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const SynchroButton = () => {
  const [_handleClickSyncro] = useSynchro();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSyncro = () => {
    _handleClickSyncro();
    handleCloseModal();
  };

  return (
    <>
      <MenuItem onClick={handleOpenModal}>
        <ListItemIcon>
          <Sync fontSize='small' />
        </ListItemIcon>
        <ListItemText>Sincronizar</ListItemText>
      </MenuItem>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style }}>
          <Typography variant='h6'>Confirmar sincronización</Typography>
          <Typography>
            ¿Estás seguro de que deseas sincronizar los datos?
          </Typography>
          <Button onClick={handleCloseModal} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleSyncro} color='primary' autoFocus>
            Sincronizar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
