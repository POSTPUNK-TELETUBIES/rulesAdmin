import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../../lib/modules/fetchClient";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { setLanguageFilter } from "../../lib/observers";

import { useTour } from "@reactour/tour";

export const LanguageFilter = () => {
  const { setIsOpen, isOpen } = useTour();

  const { data, isLoading } = useQuery({
    queryKey: ["languages"],
    queryFn: () => fetchClient.getAllLanguages(),
  });

  const _handleChange = useCallback((event: SelectChangeEvent) => {
    setLanguageFilter(event.target.value);
  }, []);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");

    if (firstVisit) return;

    localStorage.setItem("firstVisit", new Date().toDateString());

    setIsOpen(true);
  }, [setIsOpen]);

  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen) body.style.overflow = "hidden";
    else body.style.overflow = "auto";
  }, [isOpen]);

  if (isLoading) return <CircularProgress />;

  return (
    <FormControl>
      <InputLabel id="language">Lenguaje</InputLabel>
      <Select
        labelId="language"
        label="Lenguaje"
        onChange={_handleChange}
        sx={{ width: 200 }}
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
