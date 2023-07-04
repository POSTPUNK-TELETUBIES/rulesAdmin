import { useDeleteChanges } from '../../hooks';
import Button from '../Button/Button';

export const RestartButton = () => {
  const [_handleClickRestart] = useDeleteChanges();

  return (
    <Button text='Restaurar' iconType='trash' onClik={_handleClickRestart} />
  );
};
