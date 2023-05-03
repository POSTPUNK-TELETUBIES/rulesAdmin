import { QualityProfileFilter } from "./components/Filters/qualityprofiles.filter";
import { LanguageFilter } from "./components/Filters/languages.filter";
import { RulesTable } from "./components/RulesTable";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Info, QuestionAnswer } from "@mui/icons-material";

import { ColorModeWrapper } from "./theme";
import { NavBar } from "./components/NavBar";

import { DraggableMenu } from "./components/DraggableMenu";
import { Sticky } from "./layout/Sticky";

function App() {
  return (
    <ColorModeWrapper
      app={
        <>
          <NavBar />
          <Container sx={{ paddingTop: 12 }}>
            <Stack gap={3}>
              <Typography>
                <QuestionAnswer /> Activa o desactiva los switches dependiendo
                si deseas habilitar la regla o no
              </Typography>
              <Typography>
                <Info /> Recuerda que los estados que propongas no se aplicarán
                de inmediato en SonarQube
              </Typography>
            </Stack>
            <Stack direction="column" gap={4} marginTop={4}>
              <Box display="flex" gap={4}>
                <LanguageFilter />
                <QualityProfileFilter />
              </Box>
            </Stack>
            <RulesTable />
            <Sticky content={<DraggableMenu />} />
            <Stack
              paddingY={3}
              direction="row"
              gap={3}
              justifyContent={"space-between"}
            ></Stack>
          </Container>
        </>
      }
    />
  );
}

export default App;
