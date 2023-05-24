import synchroDB, { LocalRulesStatus } from '../../lib/service/dexie';
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { CloudDone, SyncProblem } from '@mui/icons-material';
import { useLiveQuery } from 'dexie-react-hooks';
import GenericPopover from '../../layout/GenericPopover';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '../../lib/modules/fetchClient';
import { SynchroButton } from '../SynchroButton';
import { keyBy, renderConditional } from '../../tools';
import { useMemo } from 'react';
import { LanguageDTO } from '../../types/supabase';

const fetchLanguages = () => fetchClient.getAllLanguages();

export const Status = () => {
  // TODO: Use live query is a reactive observable
  const rulesStatus: LocalRulesStatus[] = useLiveQuery(() =>
    synchroDB.rulesStatus.toArray()
  );

  const { data: languagesData } = useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
  });

  const languageBy = useMemo(
    () => keyBy<LanguageDTO, string>(languagesData, 'id', 'name'),
    [languagesData]
  );

  return (
    <GenericPopover
      icon={renderConditional<JSX.Element>(
        !rulesStatus?.length,
        <CloudDone />,
        <SyncProblem />
      )}
      textButton={
        <Typography>
          {renderConditional(
            !!rulesStatus?.length,
            'Tienes cambios sin sincronizar',
            'No hay cambios sin sincronizar'
          )}
        </Typography>
      }
      buttonProps={{ variant: 'contained' }}
      popoverBody={
        <Card>
          {languagesData && (
            <CardContent>
              {rulesStatus
                ?.filter(
                  ({ languageId }, index, array) =>
                    array.findIndex(
                      ({ languageId: languageIdInner }) =>
                        languageIdInner === languageId
                    ) === index
                )
                ?.map(({ languageId }, index) => (
                  <Stack key={index} direction='row'>
                    <Chip label={languageBy[languageId]} />
                  </Stack>
                ))}

              <CardActions>
                <SynchroButton />
              </CardActions>
            </CardContent>
          )}
        </Card>
      }
    />
  );
};
