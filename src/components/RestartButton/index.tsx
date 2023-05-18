import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useDeleteChanges } from "../../hooks";

export const RestartButton = () => {
  const [_handleClickRestart] = useDeleteChanges();

  return (
    <MenuItem onClick={_handleClickRestart}>
      <ListItemIcon>
        <RestartAltIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Restaurar</ListItemText>
    </MenuItem>
  );
};
