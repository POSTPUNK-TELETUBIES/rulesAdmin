import { Box, Switch } from "@mui/material";
import syncroDb from "../../lib/service/dexie";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface UncontrolledSwitchProps {
  initialStatus: boolean;
  id: string;
  language_id: string;
  qualityProfile_id: string;
}

//TODO: try to abstract this component to work with labels too
export function UncontrolledSwitch({
  initialStatus,
  id,
  language_id,
  qualityProfile_id,
}: UncontrolledSwitchProps) {
  const [isInIndexedDb, setIsInIndexedDb] = useState(false);

  useEffect(() => {
    syncroDb.rulesStatus
      .get(Number(id))
      .then((data) => setIsInIndexedDb(!!data));
  }, [id]);

  const _handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      syncroDb.rulesStatus.put({
        id: Number(id),
        newStatus: event.target.checked,
        updated_at: new Date(),
        languageId: language_id,
        qualityProfileId: qualityProfile_id,
      });
      setIsInIndexedDb(true);
    },
    [id, qualityProfile_id, language_id]
  );

  return (
    <Box color="red">
      <Switch
        color={isInIndexedDb ? "warning" : "primary"}
        onChange={_handleChange}
        defaultChecked={initialStatus}
      />

      {isInIndexedDb ? "C" : ""}
    </Box>
  );
}
