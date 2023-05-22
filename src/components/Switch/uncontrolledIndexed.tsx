import { Stack, Switch, Typography } from '@mui/material';
import synchroDb from '../../lib/service/dexie';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Sync } from '@mui/icons-material';
import { RuleDTO, RulesStatus } from '../../types/supabase';

interface UncontrolledSwitchProps {
  initialStatus: boolean;
  result: RuleDTO & RulesStatus & { isActiveOriginal: boolean };
  id: string;
}

//TODO: try to abstract this component to work with labels too
export function StatusSwitch({
  initialStatus,
  result,
  id,
}: UncontrolledSwitchProps) {
  const [isInIndexedDb, setIsInIndexedDb] = useState(false);
  const [isChecked, setIsChecked] = useState(initialStatus);

  useEffect(() => {
    setIsChecked(initialStatus);
  }, [initialStatus]);

  // TODO: this use effect should not be necessary but Switch is not re rendering when parent re renders
  // and initial status is persisting
  useEffect(() => {
    synchroDb.rulesStatus
      .get(Number(id))
      .then((data) => setIsInIndexedDb(!!data));
  }, [id]);

  const isUpdating = result.isActiveOriginal !== isChecked;

  /**
   * This side effect is intend to delete data that does not need updating
   */
  useEffect(() => {
    if (isInIndexedDb && result.isActiveOriginal === isChecked)
      synchroDb.rulesStatus.delete(Number(id));
  }, [isChecked, id, isInIndexedDb, result.isActiveOriginal]);

  // TODO: 💩 bad abstraction , refactor since we are getting al data in a bad way, duplciated code in Dexie service
  // TODO: bad code, mutation of indexed db is a side effect
  const _handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);

      const prevData = await synchroDb.rulesStatus.get(Number(id));

      if (!isInIndexedDb || result.isActiveOriginal !== event.target.checked)
        await synchroDb.rulesStatus.put({
          ...prevData,
          id: Number(id),
          newStatus: event.target.checked,
          updated_at: new Date(),
          languageId: result.lang_id,
          qualityProfileId: Number(result.qualityProfile_id),
        });
      setIsInIndexedDb(true);
    },
    [
      id,
      isInIndexedDb,
      result.isActiveOriginal,
      result.lang_id,
      result.qualityProfile_id,
    ]
  );

  return (
    <Stack direction='row' alignItems='center'>
      <Typography minWidth={60}>{isChecked ? 'Activo' : 'Inactivo'}</Typography>
      <Switch onChange={_handleChange} checked={isChecked} />
      {isInIndexedDb && isUpdating ? <Sync /> : ''}
    </Stack>
  );
}
