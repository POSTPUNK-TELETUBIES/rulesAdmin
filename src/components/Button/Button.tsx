import { ListItemText, MenuItem } from '@mui/material';
import Icon from '../Icon/icon';

type Props = {
  text: string;
  iconType: 'update' | 'download' | 'trash';
  onClik?: () => void;
};

const Button = ({ iconType, text, onClik }: Props) => {
  return (
    <MenuItem onClick={onClik} style={{ gap: '1rem' }}>
      <Icon type={iconType} />
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
};

export default Button;
