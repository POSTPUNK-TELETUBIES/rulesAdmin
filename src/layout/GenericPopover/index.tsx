import { Close } from "@mui/icons-material";
import { Box, IconButton, Popover, SxProps, Theme } from "@mui/material";
import { MouseEvent, memo, useCallback, useState } from "react";

interface GenericPopoverProps {
  popoverBody: JSX.Element;
  icon: JSX.Element;
  sxProps?: SxProps<Theme>;
  isLeft?: boolean;
}

const defaultSxProps: SxProps = {
  width: "80vh",
  maxWidth: 600,
  minWidth: 400,
  height: "80vh",
  minHeight: 400,
  borderRadius: 50,
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
        <IconButton
          onClick={_handleClose}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Close sx={{ fontSize: "medium" }} />
        </IconButton>
        <Box margin={1}>{popoverBody}</Box>
      </Popover>
    </>
  );
});

export default memoizedGenericPopOver;
