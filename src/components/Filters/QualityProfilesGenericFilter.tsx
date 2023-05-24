import {
  CircularProgress,
  FormControl,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useQualityProfiles } from '../../hooks/filters';

interface QualityProfilesGenericProfilesProps {
  handleChanges?: (event: SelectChangeEvent) => void;
  text: string;
  inputProps?: InputBaseComponentProps;
}

export const QualityProfilesGenericProfiles = ({
  handleChanges: _handleChange,
  text,
  inputProps,
}: QualityProfilesGenericProfilesProps) => {
  const { data, isFetching } = useQualityProfiles(text === 'all' ? '' : text);

  if (isFetching) return <CircularProgress />;

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id='qualityProfile-uncontrolled'>Quality Profile</InputLabel>
      <Select
        inputProps={inputProps}
        onChange={_handleChange}
        label='Quality Profile'
        labelId='qualityProfile-uncontrolled'
        defaultValue={'all'}
      >
        <MenuItem value={'all'}>Todos</MenuItem>
        {data?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
