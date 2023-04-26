import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  useActiveFilter,
  useQualityProfileFilter,
  useRuleTypeFilter,
  useSeverityFilter,
} from "../../lib/observers";
import { Download } from "@mui/icons-material";
import { fetchClient } from "../../lib/modules/fetchClient";
import { MouseEvent, useCallback, useState } from "react";

//TODO: abstraer, generalizar
export const DownloadButton = ({ cb }: { cb?: () => Promise<void> }) => {
  const severity = useSeverityFilter();
  const isActiveSonar = useActiveFilter();
  const qualityProfile_id = useQualityProfileFilter();
  const type = useRuleTypeFilter();

  const [elementRef, setElemenRef] = useState<HTMLElement>(null);

  const _handleClose = useCallback(() => {
    setElemenRef(null);
  }, []);

  const _handleClick = useCallback(
    async ({ currentTarget }: MouseEvent<HTMLElement>) => {
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
      <MenuItem disabled={!qualityProfile_id} onClick={_handleClick}>
        <ListItemIcon>
          <Download />
        </ListItemIcon>
        <ListItemText>Descarga Personalizada</ListItemText>
      </MenuItem>
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
