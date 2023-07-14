import type { RuleDTO, RulesStatus } from '../../types/supabase';

import { StatusSwitch } from '../Switch/uncontrolledIndexed';
import { IconButton, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';

import dayjs from 'dayjs';

import { CustomDrawer } from '../CustomDrawer';
import { useState } from 'react';
import { getTimeAgo } from '../../tools/getTimeAgo';

interface ExpecialConfigCell {
  resource: string;
  value: unknown;
  result: RulesStatus & RuleDTO & { isActiveOriginal: boolean };
  secondaryValue?: string | Date;
}

// TODO: check another abstraction for especial cases
export const EspecialConfigCell = ({
  resource,
  value,
  result,
  secondaryValue,
}: ExpecialConfigCell) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (resource === 'isActiveSonar')
    return <Typography>{value ? 'Activo' : 'Inactivo'}</Typography>;

  if (resource === 'htmlDesc')
    return (
      <>
        <IconButton onClick={handleToggleDrawer}>
          <Visibility />
        </IconButton>
        <CustomDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          result={result}
        />
      </>
    );

  if (resource === 'updated_at')
    return Math.abs(dayjs(String(value)).diff(secondaryValue, 'hours')) > 6 ? (
      <Typography align='left'>{getTimeAgo(String(value))}</Typography>
    ) : (
      <Typography align='left'>--</Typography>
    );

  return (
    <StatusSwitch
      initialStatus={Boolean(value)}
      result={result}
      id={result.id}
    />
  );
};
