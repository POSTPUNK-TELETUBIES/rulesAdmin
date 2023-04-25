import { IconButton, Popover, SxProps, Theme } from "@mui/material";
import { MouseEvent, memo, useCallback, useState } from "react";

interface GenericPopoverProps {
  popoverBody: JSX.Element;
  icon: JSX.Element;
  sxProps?: SxProps<Theme>;
}

const defaultSxProps: SxProps = {
  width: "50vh",
  maxWidth: 600,
  minWidth: 400,
  height: "50vh",
  minHeight: 400,
};

const memoizedGenericPopOver = memo(function ({
  popoverBody,
  icon,
  sxProps,
}: GenericPopoverProps) {
  const [popOverRef, setPopOverRef] = useState<HTMLButtonElement | null>(null);

  const _handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setPopOverRef(event.currentTarget);
  }, []);

  const _handleClose = useCallback(() => {
    setPopOverRef(null);
  }, []);

  return (
    <>
      <IconButton onClick={_handleClick} sx={{ margin: "auto" }}>
        {icon}
      </IconButton>
      <Popover
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={sxProps ?? defaultSxProps}
        open={Boolean(popOverRef)}
        onClose={_handleClose}
        anchorEl={popOverRef}
      >
        {popoverBody}
      </Popover>
    </>
  );
});

export default memoizedGenericPopOver;
