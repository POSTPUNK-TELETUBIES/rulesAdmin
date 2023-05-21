import { Box, Stack, Typography, Button } from "@mui/material";
import admin from "/admin.svg";
import { useCallback, useState } from "react";

import { SxProps } from "@mui/material/styles";

import styles from "./home.module.css";
import { LoginDrawer } from "../components/LoginDrawer";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Box sx={BoxStyles}>
          <img
            className={styles.heroImage}
            src={admin}
            alt="admin configuring panel"
          />
        </Box>
        <Stack spacing={1} width={{ sm: "100%", md: "50%" }}>
          <Typography variant="h3" component="h1">
            Ace config and simplify SonarQube rule administration
          </Typography>
          <Typography variant="body1">
            Effortlessly Customize SonarQube Rules for Optimal Code Quality
          </Typography>
          <Stack spacing={2} direction={{ sm: "column", md: "row" }}>
            <Button variant="contained">Sing up</Button>
            <Button variant="outlined" onClick={_handleOpen}>
              Log in
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <LoginDrawer
        handleClose={_handleClose}
        handleOpen={_handleOpen}
        isOpen={isOpen}
      />
    </>
  );
};

const BoxStyles: SxProps = {
  width: {
    xs: "0%",
    md: "50%",
  },
  display: {
    xs: "none",
    md: "block",
  },
};
