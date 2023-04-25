import { QualityProfileFilter } from "./components/Filters/qualityprofiles.filter";
import { LanguageFilter } from "./components/Filters/languages.filter";
import { TypesFilter } from "./components/Filters/types.filter";
import { SeverityProfileFilter } from "./components/Filters/severities.filter";
import { ActivateFilter } from "./components/Filters/activate.filter";
import { RulesTable } from "./components/RulesTable";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Download, Info, QuestionAnswer, Sync } from "@mui/icons-material";
import syncroIndexedDb from "./lib/service/dexie";
import { useCallback, useState } from "react";
import { fetchClient } from "./lib/modules/fetchClient";
import { ColorModeWrapper } from "./theme";
import { NavBar } from "./components/NavBar";
import {
  setPage,
  useQualityProfileFilter,
  useTotalStatus,
} from "./lib/observers";
import { reactQueryClient } from "./lib/modules/reactQuery";

//TODO: abstraer, generalizar
const DownloadButton = ({ cb }: { cb?: () => Promise<void> }) => {
  const qualityProfile_id = useQualityProfileFilter();

  const _handleClick = useCallback(async () => {
    if (!qualityProfile_id) return;

    if (cb) await cb();

    await fetchClient.downloadReport({ qualityProfile_id });
  }, [cb, qualityProfile_id]);

  return (
    <Button startIcon={<Download />} variant="contained" onClick={_handleClick}>
      Descargar
    </Button>
  );
};

const ActionButtons = () => {
  const totalstatus = useTotalStatus();

  const [isProcessing, setIsProcessing] = useState(false);

  const _handleClick = useCallback(async () => {
    setIsProcessing(true);
    const changes = await syncroIndexedDb.rulesStatus.toArray();
    await fetchClient.postNewStatus(changes);
    await syncroIndexedDb.rulesStatus.clear();
    await reactQueryClient.invalidateQueries({ queryKey: ["rules"] });
    setPage(1);
    setIsProcessing(false);
  }, []);

  if (isProcessing)
    return (
      <Box width="100%" display="flex" justifyContent="center" padding={2}>
        <CircularProgress sx={{ margin: "auto" }} color="info" />
      </Box>
    );

  if (!totalstatus) return;

  return (
    <>
      <Button startIcon={<Sync />} variant="contained" onClick={_handleClick}>
        Sincronizar
      </Button>
      <DownloadButton cb={_handleClick} />
    </>
  );
};

function App() {
  return (
    <ColorModeWrapper
      app={
        <>
          <NavBar />
          <Container sx={{ paddingY: 12 }}>
            <Stack gap={3}>
              <Typography variant="h4" component="h1">
                Sistema de activacion e inspeccion de reglas
              </Typography>
              <Typography>
                <QuestionAnswer /> Selecciona el nuevo estado que se desea que
                tengan las reglas
              </Typography>
              <Typography>
                <Info /> Recuerda que el estado propuesto no se aplicara de
                inmediato en Sonar Qube
              </Typography>
            </Stack>
            <Stack direction="column" gap={4} marginTop={4}>
              <Box display={"flex"} gap={4}>
                <LanguageFilter />
                <QualityProfileFilter />
              </Box>
              <Box display={"flex"} gap={4}>
                <TypesFilter />
                <SeverityProfileFilter />
                <ActivateFilter />
              </Box>
            </Stack>
            <RulesTable />
            <Stack
              paddingY={3}
              direction="row"
              gap={3}
              justifyContent={"space-between"}
            >
              <ActionButtons />
            </Stack>
          </Container>
        </>
      }
    />
  );
}

export default App;
