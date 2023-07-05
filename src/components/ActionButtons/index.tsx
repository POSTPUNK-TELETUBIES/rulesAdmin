import { useCallback, useState } from 'react';
import { DownloadDrawer } from '../DownloadDrawer';
import Button from '../Button/Button';

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
      <Button
        text='Descarga Personalizada'
        iconType='download'
        onClik={_handleClick}
      />
      <DownloadDrawer handleClose={_handleClose} isOpen={isOpen} />
    </>
  );
};
