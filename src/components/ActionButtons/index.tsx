import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

import { Download } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { DownloadDrawer } from "../DownloadDrawer";

export const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const _handleClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const _handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <MenuItem onClick={_handleClick}>
        <ListItemIcon>
          <Download />
        </ListItemIcon>
        <ListItemText>Descarga Personalizada</ListItemText>
      </MenuItem>
      <DownloadDrawer handleClose={_handleClose} isOpen={isOpen} />
    </>
  );
};
