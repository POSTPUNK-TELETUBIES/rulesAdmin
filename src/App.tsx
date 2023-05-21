import { QualityProfileFilter } from "./components/Filters/qualityprofiles.filter";
import { LanguageFilter } from "./components/Filters/languages.filter";
import { RulesTable } from "./components/RulesTable";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Info, QuestionAnswer } from "@mui/icons-material";

import { ColorModeWrapper } from "./theme";
import { NavBar } from "./components/NavBar";

import { DraggableMenu } from "./components/DraggableMenu";
import { Sticky } from "./layout/Sticky";
import { Search } from "./components/Search";
import { Home } from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/auth";

function App() {
  const { isLogged } = useContext(AuthContext);

  return (
    <ColorModeWrapper
      app={
        <>
          <NavBar />
          <Container sx={{ paddingTop: 12, minHeight: "100vh" }}>
            {!isLogged ? (
              <Home />
            ) : (
              <>
                <Stack gap={3}>
                  <Typography>
                    <QuestionAnswer /> Activa o desactiva los switches
                    dependiendo si deseas habilitar la regla o no
                  </Typography>
                  <Typography>
                    <Info /> Recuerda que los estados que propongas no se
                    aplicarán de inmediato en SonarQube
                  </Typography>
                </Stack>
                <Stack direction="column" gap={4} marginTop={4}>
                  <Box display="flex" gap={4}>
                    <LanguageFilter />
                    <QualityProfileFilter />
                    <Search />
                  </Box>
                </Stack>
                <RulesTable />
                <Sticky content={<DraggableMenu />} />
              </>
            )}
          </Container>
        </>
      }
    />
  );
}

export default App;
