import { Sync } from "@mui/icons-material";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useSynchro } from "../../hooks";

export const SynchroButton = () => {
  const [_handleClickSyncro] = useSynchro();

  return (
    <MenuItem onClick={_handleClickSyncro}>
      <ListItemIcon>
        <Sync fontSize="small" />
      </ListItemIcon>
      <ListItemText>Sincronizar</ListItemText>
    </MenuItem>
  );
};
