import { useCallback, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  setQualityProfileFilterChange,
  useLanguageFilter,
} from "../../lib/observers";
import { fetchClient } from "../../lib/modules/fetchClient";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

export const QualityProfileFilter = () => {
  const text = useLanguageFilter();
  const selectRef = useRef<HTMLSelectElement>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["qualityprofile", text],
    queryFn: () => fetchClient.getQualityProfilesByLanguage(text),
    enabled: !!text,
  });

  useEffect(() => {
    setQualityProfileFilterChange(selectRef.current?.value ?? "");
  }, [text]);

  const _handleChange = useCallback((event: SelectChangeEvent) => {
    setQualityProfileFilterChange(event.target.value);
  }, []);

  if (isFetching) return <CircularProgress />;

  return (
    <FormControl sx={{ width: 200 }}>
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
