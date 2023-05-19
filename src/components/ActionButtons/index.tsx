import {
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";

import { Download } from "@mui/icons-material";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { filterConfig } from "../../lib/config/filters";

export const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompleteRef = useRef<boolean | null>();
  const typeFilter = useRef<string | "">();

  const _handleClick = useCallback(() => {
    setIsOpen(true);
  }, []);

  const _handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    isCompleteRef.current = event.target.checked;
  };

  const _handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    typeFilter.current = event.target.value;
  };

  return (
    <>
      <MenuItem onClick={_handleClick}>
        <ListItemIcon>
          <Download />
        </ListItemIcon>
        <ListItemText>Descarga Personalizada</ListItemText>
      </MenuItem>
      <Drawer
        variant="persistent"
        onClose={_handleClose}
        anchor="right"
        open={isOpen}
        sx={{ width: "300px" }}
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
    </>
  );
};

//TODO: abstraer, generalizar
