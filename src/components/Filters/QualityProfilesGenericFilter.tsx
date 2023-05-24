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
  includeAllOptions?: boolean;
}

export const QualityProfilesGenericProfiles = ({
  handleChanges: _handleChange,
  text,
  inputProps,
  includeAllOptions,
}: QualityProfilesGenericProfilesProps) => {
  const { data, isFetching } = useQualityProfiles(text === 'all' ? '' : text);

  if (isFetching) return <CircularProgress />;

  const [firstOption] = data;

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id='qualityProfile-uncontrolled'>Quality Profile</InputLabel>
      <Select
        inputProps={inputProps}
        onChange={_handleChange}
        label='Quality Profile'
        labelId='qualityProfile-uncontrolled'
        defaultValue={includeAllOptions ? 'all' : firstOption?.id}
      >
        {includeAllOptions && <MenuItem value={'all'}>Todos</MenuItem>}
        {data?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
