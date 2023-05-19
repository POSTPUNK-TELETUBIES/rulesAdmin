import {
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { filterConfig } from "../../lib/config/filters";
import { ChangeEvent, useRef } from "react";

interface DownloadDrawerInterface {
  handleClose: () => void;
  isOpen: boolean;
}

export const DownloadDrawer = ({
  handleClose: _handleClose,
  isOpen,
}: DownloadDrawerInterface) => {
  const isCompleteRef = useRef<boolean | null>();
  const typeFilter = useRef<string | "">();

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    isCompleteRef.current = event.target.checked;
  };

  const _handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    typeFilter.current = event.target.value;
  };

  return (
    <Drawer
      variant="persistent"
      onClose={_handleClose}
      anchor="right"
      open={isOpen}
      sx={{ minWidth: 300 }}
    >
      <FormControlLabel
        control={<Switch defaultChecked onChange={_handleChange} />}
        label="Completo"
      />
      <FormControl
        sx={{ width: 200 }}
        className="type"
        onChange={_handleFilterChange}
      >
        <InputLabel id="type">Lenguaje</InputLabel>
        <Select
          labelId="type"
          label="type"
          onChange={_handleChange}
          sx={{ width: 200 }}
          defaultValue={""}
          displayEmpty
        >
          {filterConfig?.map(({ value, label }) => (
            <MenuItem key={label} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Drawer>
  );
};
