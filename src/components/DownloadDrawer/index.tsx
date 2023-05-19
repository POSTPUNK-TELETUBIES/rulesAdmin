import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import {
  filterTypeConfig,
  filterSeverityConfig,
  filterStateConfig,
} from "../../lib/config/filters";
import { ChangeEvent, useRef, useState } from "react";
import { Download } from "@mui/icons-material";

interface DownloadDrawerInterface {
  handleClose: () => void;
  isOpen: boolean;
}

export const DownloadDrawer = ({
  handleClose: _handleClose,
  isOpen,
}: DownloadDrawerInterface) => {
  const [isActive, setIsActive] = useState(false);
  const typeFilter = useRef<string | "">();
  const severityFilter = useRef<string | "">();
  const stateFilter = useRef<string | "">();

  const _handleStateChange = () => {
    setIsActive(!isActive);
  };

  const _handleFilterTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    typeFilter.current = event.target.value;
  };

  const _handleFilterSeverityChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    severityFilter.current = event.target.value;
  };

  const _handleFilterStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    stateFilter.current = event.target.value;
  };

  return (
    <Drawer
      variant="persistent"
      onClose={_handleClose}
      anchor="right"
      open={isOpen}
      sx={{ minWidth: 300 }}
    >
      <List>
        <ListItem>
          <FormControlLabel
            control={<Switch onClick={_handleStateChange} />}
            label="Filtros"
          />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem>
          <FormControl
            sx={{ width: 200 }}
            className="type"
            onChange={_handleFilterTypeChange}
          >
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              label="Type"
              sx={{ width: 200 }}
              defaultValue={""}
              disabled={!isActive}
              displayEmpty
            >
              {filterTypeConfig?.map(({ value, label }) => (
                <MenuItem key={label} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControl
            sx={{ width: 200 }}
            className="severity"
            onChange={_handleFilterSeverityChange}
          >
            <InputLabel id="severity">Severity</InputLabel>
            <Select
              labelId="severity"
              label="Severity"
              sx={{ width: 200 }}
              defaultValue={""}
              disabled={!isActive}
              displayEmpty
            >
              {filterSeverityConfig?.map(({ value, label }) => (
                <MenuItem key={label} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControl
            sx={{ width: 200 }}
            className="state"
            onChange={_handleFilterStateChange}
          >
            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="state"
              label="State"
              sx={{ width: 200 }}
              defaultValue={""}
              disabled={!isActive}
              displayEmpty
            >
              {filterStateConfig?.map(({ value, label }) => (
                <MenuItem key={label} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <FormControlLabel control={<Switch />} label="Solo diferencias" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{ width: 200 }}
          >
            Download
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};
