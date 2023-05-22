import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  Popover,
  SxProps,
  Theme,
} from '@mui/material';
import { MouseEvent, memo, useCallback, useState } from 'react';

interface GenericPopoverProps {
  popoverBody: JSX.Element;
  icon?: JSX.Element;
  sxProps?: SxProps<Theme>;
  isLeft?: boolean;
  textButton?: JSX.Element;
  buttonProps?: ButtonProps;
}

const defaultSxProps: SxProps = {
  width: '80vh',
  maxWidth: 600,
  minWidth: 400,
  height: '80vh',
  minHeight: 400,
  borderRadius: 50,
};

const memoizedGenericPopOver = memo(function ({
  popoverBody,
  icon,
  sxProps,
  textButton,
  buttonProps,
}: GenericPopoverProps) {
  const [popOverRef, setPopOverRef] = useState<HTMLButtonElement | null>(null);

  const _handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPopOverRef(event.currentTarget);
  }, []);

  const _handleClose = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPopOverRef(null);
  }, []);

  return (
    <>
      {!textButton ? (
        <IconButton onClick={_handleClick} sx={{ margin: 'auto' }}>
          {icon}
        </IconButton>
      ) : (
        <Button startIcon={icon} onClick={_handleClick} {...buttonProps}>
          {textButton}
        </Button>
      )}
      <Popover
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={sxProps ?? defaultSxProps}
        open={Boolean(popOverRef)}
        onClose={_handleClose}
        anchorEl={popOverRef}
      >
        <IconButton
          onClick={_handleClose}
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <Close sx={{ fontSize: 'medium' }} />
        </IconButton>
        <Box margin={1}>{popoverBody}</Box>
      </Popover>
    </>
  );
});

export default memoizedGenericPopOver;
