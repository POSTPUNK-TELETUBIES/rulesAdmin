import { useCallback, useEffect, useRef } from "react";
import {
  setQualityProfileFilterChange,
  useLanguageFilter,
} from "../../lib/observers";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useQualityProfiles } from "../../hooks/filters";

export const QualityProfileFilter = () => {
  const text = useLanguageFilter();
  const selectRef = useRef<HTMLSelectElement>(null);

  const { data, isFetching } = useQualityProfiles(text);

  useEffect(() => {
    setQualityProfileFilterChange(selectRef.current?.value ?? "");
  }, [text]);

  const _handleChange = useCallback((event: SelectChangeEvent) => {
    setQualityProfileFilterChange(event.target.value);
  }, []);

  if (isFetching) return <CircularProgress />;

  return (
    <FormControl className="mainFilters" sx={{ width: 200 }}>
      <InputLabel id="qualityprofile">Quality Profile</InputLabel>
      <Select
        ref={selectRef}
        onChange={_handleChange}
        label="Quality Profile"
        labelId="qualityprofile"
        defaultValue={""}
        displayEmpty
      >
        {data?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
