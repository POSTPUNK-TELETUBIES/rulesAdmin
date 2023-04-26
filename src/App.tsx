import { MouseEvent, useCallback, useState } from "react";

import { QualityProfileFilter } from "./components/Filters/qualityprofiles.filter";
import { LanguageFilter } from "./components/Filters/languages.filter";
import { TypesFilter } from "./components/Filters/types.filter";
import { SeverityProfileFilter } from "./components/Filters/severities.filter";
import { ActivateFilter } from "./components/Filters/activate.filter";
import { RulesTable } from "./components/RulesTable";
import {
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Download, Info, QuestionAnswer, Sync } from "@mui/icons-material";
import syncroIndexedDb from "./lib/service/dexie";

import { fetchClient } from "./lib/modules/fetchClient";
import { ColorModeWrapper } from "./theme";
import { NavBar } from "./components/NavBar";
import {
  setPage,
  useActiveFilter,
  useQualityProfileFilter,
  useRuleTypeFilter,
  useSeverityFilter,
  useTotalStatus,
} from "./lib/observers";

import { reactQueryClient } from "./lib/modules/reactQuery";

//TODO: abstraer, generalizar
const DownloadButton = ({ cb }: { cb?: () => Promise<void> }) => {
  const severity = useSeverityFilter();
  const isActiveSonar = useActiveFilter();
  const qualityProfile_id = useQualityProfileFilter();
  const type = useRuleTypeFilter();

  const [elementRef, setElemenRef] = useState<HTMLButtonElement>(null);

  const _handleClose = useCallback(() => {
    setElemenRef(null);
  }, []);

  const _handleClick = useCallback(
    async ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      if (!qualityProfile_id) return;

      setElemenRef(currentTarget);
    },
    [qualityProfile_id]
  );

  const _handleDownloadDiff = useCallback(async () => {
    if (cb) await cb();

    await fetchClient.downloadReport({ qualityProfile_id });
  }, [cb, qualityProfile_id]);

  const _handleDownloadFiltered = useCallback(async () => {
    if (cb) await cb();

    await fetchClient.downloadReport(
      {
        isActiveSonar,
        qualityProfile_id,
        severity,
        type,
      },
      false
    );
  }, [isActiveSonar, qualityProfile_id, severity, type, cb]);

  return (
    <>
      <Button
        startIcon={<Download />}
        variant="contained"
        onClick={_handleClick}
      >
        Descarga Personalizada
      </Button>
      <Menu
        anchorEl={elementRef}
        onClose={_handleClose}
        open={Boolean(elementRef)}
      >
        <MenuItem onClick={_handleDownloadDiff}>
          Reporte de Actualizables
        </MenuItem>
        <MenuItem onClick={_handleDownloadFiltered}>Reporte Completo</MenuItem>
      </Menu>
    </>
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

  if (!totalstatus || isProcessing) return;

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
                Sistema de activación e inspección de reglas
              </Typography>
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
              <Box className="mainFilters" display={"flex"} gap={4}>
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
