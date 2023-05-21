import {
  Box,
  Stack,
  Typography,
  Button,
  SwipeableDrawer,
  Container,
  useMediaQuery,
} from "@mui/material";
import admin from "/admin.svg";
import { useCallback, useState } from "react";
import { Login } from "../components/Login";
import { useTheme } from "@mui/material/styles";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const _handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const _handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        height={"80vh"}
        spacing={2}
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: {
              xs: "0%",
              md: "50%",
            },
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <img
            style={{ width: "100%" }}
            src={admin}
            alt="admin configuring panel"
          />
        </Box>
        <Stack
          spacing={1}
          width={{
            sm: "100%",
            md: "50%",
          }}
        >
          <Typography variant="h3" component="h1">
            Ace config and simplify SonarQube rule administration
          </Typography>
          <Typography variant="body1">
            Effortlessly Customize SonarQube Rules for Optimal Code Quality
          </Typography>
          <Stack
            spacing={2}
            direction={{
              sm: "column",
              md: "row",
            }}
          >
            <Button variant="contained">Sing up</Button>
            <Button variant="outlined" onClick={_handleOpen}>
              Log in
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            justifyContent: "center",
          },
        }}
        onOpen={_handleOpen}
        onClose={_handleClose}
        open={isOpen}
        anchor={matches ? "right" : "bottom"}
      >
        <Container
          sx={{
            maxWidth: 500,
            width: {
              md: "50vw",
            },
            minHeight: "50vh",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Login />
        </Container>
      </SwipeableDrawer>
    </>
  );
};
