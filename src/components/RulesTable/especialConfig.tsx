import type { RuleDTO, RulesStatus } from '../../types/supabase';

import { TimeAgo } from '../TimeAgo';

import { StatusSwitch } from '../Switch/uncontrolledIndexed';
import { IconButton, Typography } from '@mui/material';
import { Visibility } from '@mui/icons-material';

import dayjs from 'dayjs';
import { useState } from 'react';
import { CustomDrawer } from '../CustomDrawer';

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
  const [showDescription, setShowDescription] = useState(false);

  const handleToggleHistory = (event) => {
    event.stopPropagation();
    // history logic
  };

  const handleToggleDescription = (event) => {
    event.stopPropagation();
    setShowDescription(!showDescription);
  };

  const handleToggleDrawer = (event) => {
    event.stopPropagation();
    setShowDescription(false);
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClick = (event) => {
    event.stopPropagation();
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
          handleToggleDrawer={handleToggleDrawer}
          handleDrawerClick={handleDrawerClick}
          handleToggleDescription={handleToggleDescription}
          showDescription={showDescription}
          result={result}
          handleToggleHistory={handleToggleHistory}
        />
      </>
    );

  if (resource === 'updated_at')
    return Math.abs(dayjs(String(value)).diff(secondaryValue, 'hours')) > 6 ? (
      <TimeAgo date={String(value)} />
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
