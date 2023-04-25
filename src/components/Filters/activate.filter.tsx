import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { setActivateFilterChange } from "../../lib/observers";

const parsedValues = Object.freeze({
  all: null,
  active: true,
  deactive: false,
});

export const ActivateFilter = () => {
  const _handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setActivateFilterChange(parsedValues[event.target.value]);
  }, []);

  return (
    <FormControl>
      <InputLabel id="sonarStatus">Estado actual Sonar</InputLabel>
      <Select
        labelId="sonarStatus"
        onChange={_handleChange}
        sx={{ width: 200 }}
        defaultValue="all"
        displayEmpty
        label="Estado actual sonar"
      >
        <MenuItem value="all">TODOS</MenuItem>
        <MenuItem value="active">ACTIVOS</MenuItem>
        <MenuItem value="deactive">INACTIVOS</MenuItem>
      </Select>
    </FormControl>
  );
};
