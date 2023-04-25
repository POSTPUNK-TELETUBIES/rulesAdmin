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
  isLeft,
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
        <Box display="flex" justifyContent={isLeft ? "flex-start" : "flex-end"}>
          <IconButton onClick={_handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box margin={2}>{popoverBody}</Box>
      </Popover>
    </>
  );
});

export default memoizedGenericPopOver;
