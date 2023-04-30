import syncroDB from "../../lib/service/dexie";
import { Stack, Typography } from "@mui/material";
import { CloudDone, SyncProblem } from "@mui/icons-material";
import { useLiveQuery } from "dexie-react-hooks";
import { ColorPalletes } from "../../theme";

export const Status = () => {
  // TODO: Use live query is a reactive observable
  const countTotal = useLiveQuery(() => syncroDB.rulesStatus.count());

  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      borderRadius={2}
      bgcolor={({ palette: { mode, grey } }) =>
        mode !== ColorPalletes.DARK ? "rgba(65, 255, 200, 0.4)" : grey[700]
      }
    >
      {countTotal ? (
        <SyncProblem color="warning" />
      ) : (
        <CloudDone color="success" />
      )}
      <Typography>
        {countTotal
          ? "Tienes cambios sin sincronizar"
          : "No hay cambios sin sincronizar"}
      </Typography>
    </Stack>
  );
};
