import { Delete } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { useDeleteChanges } from '../../hooks';

export const RestartButton = () => {
  const [_handleClickRestart] = useDeleteChanges();

  return (
    <MenuItem onClick={_handleClickRestart}>
      <ListItemIcon>
        <Delete fontSize='small' />
      </ListItemIcon>
      <ListItemText>Restaurar</ListItemText>
    </MenuItem>
  );
};
