import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Severity } from "../../types/supabase";
import { useCallback } from "react";
import { setSeverityFilterChange } from "../../lib/observers";

const severityValues = Object.freeze(Object.values(Severity));

export const SeverityProfileFilter = () => {
  const _handleChange = useCallback((event: SelectChangeEvent) => {
    setSeverityFilterChange(event.target.value);
  }, []);

  return (
    <FormControl>
      <InputLabel id="severity">Severidad</InputLabel>
      <Select
        label="Severidad"
        labelId="severity"
        onChange={_handleChange}
        sx={{ width: 200 }}
        defaultValue={"all"}
        displayEmpty
      >
        {<MenuItem value={"all"}>TODOS</MenuItem>}
        {severityValues.map((severity) => (
          <MenuItem key={severity} value={severity}>
            {severity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
