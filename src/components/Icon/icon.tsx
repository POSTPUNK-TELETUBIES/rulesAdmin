import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

type IconTypes = 'update' | 'download' | 'trash';

type Props = {
  type: IconTypes;
};

const icon = ({ type }: Props) => {
  return (
    <div>
      {type === 'update' && <AutorenewIcon fontSize='small' />}
      {type === 'download' && <DownloadIcon fontSize='small' />}
      {type === 'trash' && <DeleteIcon fontSize='small' />}
    </div>
  );
};

export default icon;
