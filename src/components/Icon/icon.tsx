import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

type IconTypes = 'update' | 'download' | 'trash';

type Props = {
  type: IconTypes;
};

const iconMap: Record<IconTypes, React.ElementType> = {
  update: AutorenewIcon,
  download: DownloadIcon,
  trash: DeleteIcon,
};

const Icon = ({ type }: Props) => {
  const IconComponent = iconMap[type];

  return <div>{IconComponent && <IconComponent fontSize='small' />}</div>;
};

export default Icon;
