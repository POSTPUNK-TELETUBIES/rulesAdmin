import { FormControl, InputLabel } from "@mui/material";

interface BasicInputProps {
  input: JSX.Element;
  id: string;
  label: string;
}

export const BasicInput = ({ input, id, label }: BasicInputProps) => {
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id={id}>{label}</InputLabel>
      {input}
    </FormControl>
  );
};
