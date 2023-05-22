import { InputBaseComponentProps, MenuItem, Select } from '@mui/material';

interface UncontrolledSelectProps {
  isActive?: boolean;
  labelId: string;
  label: string;
  inputProps?: InputBaseComponentProps;
  config: { value: string; label: string }[];
}

export const UncontrolledSelect = ({
  label,
  labelId,
  isActive,
  inputProps,
  config,
}: UncontrolledSelectProps) => (
  <Select
    labelId={labelId}
    label={label}
    sx={{ width: 200 }}
    defaultValue={'all'}
    disabled={!isActive}
    displayEmpty
    inputProps={inputProps}
  >
    {config?.map(({ value, label }) => (
      <MenuItem key={label} value={value}>
        {label}
      </MenuItem>
    ))}
  </Select>
);
