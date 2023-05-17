import { Box, Switch } from "@mui/material";
import synchroDb from "../../lib/service/dexie";
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
    synchroDb.rulesStatus
      .get(Number(id))
      .then((data) => setIsInIndexedDb(!!data));
  }, [id]);

  // TODO: 💩 bad abstraction , refactor since we are getting al data in a bad way, duplciated code in Dexie service
  const _handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const prevData = await synchroDb.rulesStatus.get(Number(id));

      synchroDb.rulesStatus.put({
        ...prevData,
        id: Number(id),
        newStatus: event.target.checked,
        updated_at: new Date(),
        languageId: language_id,
        qualityProfileId: Number(qualityProfile_id),
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
