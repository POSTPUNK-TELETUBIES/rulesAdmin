import {
  CircularProgress,
  FormControl,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLanguages } from "../../hooks/filters";

interface LanguageGenericFilterProps {
  handleChange: (event: SelectChangeEvent) => void;
  className: string;
  inputProps?: InputBaseComponentProps;
  includeAllOption?: boolean;
  displayEmpty?: boolean;
}

export const LanguageGenericFilter = ({
  className,
  handleChange: _handleChange,
  inputProps,
  includeAllOption,
  displayEmpty,
}: LanguageGenericFilterProps) => {
  const { data, isLoading } = useLanguages();

  return (
    <FormControl sx={{ width: 200 }} className={className}>
      {!isLoading ? (
        <>
          <InputLabel id="language">Lenguaje</InputLabel>
          <Select
            inputProps={inputProps}
            labelId="language"
            label="Lenguaje"
            onChange={_handleChange}
            sx={{ width: 200 }}
            defaultValue={includeAllOption ? "all" : ""}
            displayEmpty={displayEmpty}
          >
            {includeAllOption && <MenuItem value="all">Todos</MenuItem>}
            {data?.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <CircularProgress />
      )}
    </FormControl>
  );
};
