import { Sync } from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Button,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { useSynchro } from "../../hooks";
import { useEffect, useState } from "react";
import { SynchroIndexedDb } from "../../lib/service/dexie";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const obtenerContenidoDesdeIndexedDB = () => {
  return SynchroIndexedDb.rulesStatus.toArray().then((data) => {
    if (data && data.length > 0) {
      return data[0].content;
    } else {
      return "";
    }
  });
};

export const SynchroButton = () => {
  const [_handleClickSyncro] = useSynchro();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

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

  useEffect(() => {
    const syncedContent = obtenerContenidoDesdeIndexedDB();
    setContent(syncedContent);
  }, []);

  return (
    <>
      <MenuItem onClick={handleOpenModal}>
        <ListItemIcon>
          <Sync fontSize="small" />
        </ListItemIcon>
        <ListItemText>Sincronizar</ListItemText>
      </MenuItem>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 350 }}>
          <Typography variant="h6">Confirmar sincronización</Typography>
          <Typography>{content}</Typography>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSyncro} color="primary" autoFocus>
            Sincronizar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
