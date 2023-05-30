import type { RuleDTO, RulesStatus } from '../../types/supabase';

import { TimeAgo } from '../TimeAgo';
import { PopOverDetails } from '../PopOverDetails';

import { StatusSwitch } from '../Switch/uncontrolledIndexed';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

import dayjs from 'dayjs';
import { useState } from 'react';

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

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

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
        <Drawer
          anchor='right'
          open={isDrawerOpen}
          onClose={handleToggleDrawer}
          PaperProps={{ style: { width: '33.33%' } }}
        >
          <Box padding={2}>
            <Button
              onClick={handleToggleDescription}
              variant='contained'
              size='large'
            >
              Descripción
            </Button>
            {showDescription && (
              <PopOverDetails
                tags={[result.severity, result.type]}
                isActive={result.isActive}
                ruleTitle={result.name}
                ruleDescription={result.htmlDesc}
              />
            )}
          </Box>
          <Divider />
          <Box padding={2}>
            <Button
              sx={{ padding: '8px 16px' }}
              variant='contained'
              size='large'
            >
              Historial
            </Button>
          </Box>
        </Drawer>
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
