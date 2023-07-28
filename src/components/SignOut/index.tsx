import { useSignOut } from 'react-auth-kit';
import { ListItemIcon, MenuItem } from '@mui/material';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const SignInComponent = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/home');
  };

  return (
    <MenuItem onClick={handleSignOut}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
};

export default SignInComponent;
