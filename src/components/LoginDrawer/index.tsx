import {
  Container,
  SwipeableDrawer,
  SxProps,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

interface LoginDrawer {
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
  content: JSX.Element;
}

export const LoginDrawer = ({
  handleClose: _handleClose,
  handleOpen: _handleOpen,
  isOpen,
  content,
}: LoginDrawer) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: { justifyContent: "center" },
      }}
      onOpen={_handleOpen}
      onClose={_handleClose}
      open={isOpen}
      anchor={matches ? "right" : "bottom"}
    >
      <Container sx={containerStyles}>{content}</Container>
    </SwipeableDrawer>
  );
};

const containerStyles: SxProps = {
  maxWidth: 500,
  width: {
    md: "50vw",
  },
  minHeight: "50vh",
  display: "grid",
  placeContent: "center",
};
