import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  SelectChangeEvent,
  Stack,
  Switch,
} from '@mui/material';

import { useForm, type SubmitHandler } from 'react-hook-form';

import { useCallback, useState } from 'react';
import { Download } from '@mui/icons-material';
import { UncontrolledSelect } from '../Filters/UncontrolledSelect';
import { uncontrolledLocalFilters } from './config';
import { LanguageGenericFilter } from '../Filters/LanguageGenericFilter';
import { QualityProfilesGenericProfiles } from '../Filters/QualityProfilesGenericFilter';

import supabaseClient from '../../lib/service/supabase';

interface DownloadDrawerInterface {
  handleClose: () => void;
  isOpen: boolean;
}

interface FilterFields {
  type?: string;
  severity?: string;
  state?: string;
  language_id?: string;
  qualityProfile_id?: string;
  showOnlyIsActiveDifferences: boolean;
}

export const DownloadDrawer = ({
  handleClose: _handleClose,
  isOpen,
}: DownloadDrawerInterface) => {
  const { register, handleSubmit } = useForm();

  const [language, setLanguage] = useState<string>();

  const [areFiltersAvailable, setAreFiltersAvailable] = useState(true);

  const _handleSubmit: SubmitHandler<FilterFields> = useCallback(
    async (data) => {
      return await supabaseClient().downloadReport(
        {
          lang_id: data.language_id,
          qualityProfile_id: data.qualityProfile_id,
          severity: data.severity,
          type: data.type,
          isActiveSonar: data.state,
        },
        data.showOnlyIsActiveDifferences
      );
    },
    []
  );

  const _handleChangeLanguage = useCallback((event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  }, []);

  return (
    <Drawer
      variant='persistent'
      onClose={_handleClose}
      anchor='right'
      open={isOpen}
    >
      <Stack
        sx={{ minWidth: 400 }}
        component='form'
        onSubmit={handleSubmit(_handleSubmit)}
      >
        <List>
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  {...register('showOnlyIsActiveDifferences')}
                  checked={!areFiltersAvailable}
                  onChange={(event) =>
                    setAreFiltersAvailable(!event.target.checked)
                  }
                />
              }
              label='Solo estados propuestos'
            />
          </ListItem>
          <Divider />
          <ListItem>
            <LanguageGenericFilter
              includeAllOption={areFiltersAvailable}
              inputProps={register('language_id')}
              className='generic-filter-uncontrolled'
              handleChange={_handleChangeLanguage}
            />
          </ListItem>
          <ListItem>
            <QualityProfilesGenericProfiles
              includeAllOptions={areFiltersAvailable}
              text={language}
              inputProps={register('qualityProfile_id')}
            />
          </ListItem>
          {areFiltersAvailable && (
            <>
              <Divider />
              {uncontrolledLocalFilters.map(
                ({ id, label, registerField, config }) => (
                  <ListItem key={id + label}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel id={id}>{label}</InputLabel>
                      <UncontrolledSelect
                        config={config}
                        label={label}
                        labelId={id}
                        inputProps={register(registerField)}
                      />
                    </FormControl>
                  </ListItem>
                )
              )}
            </>
          )}
          <Divider />
          <ListItem>
            <Button
              type='submit'
              variant='contained'
              startIcon={<Download />}
              sx={{ width: '100%' }}
            >
              Descargar
            </Button>
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  );
};
