import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useCallback, useState } from "react";

interface PasswordProps {
  inputProps?: InputBaseComponentProps;
  disabled?: boolean;
}

export const Password = ({ inputProps, disabled }: PasswordProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const _handleClick = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return (
    <FormControl disabled={disabled}>
      <InputLabel htmlFor={"password"}>Password</InputLabel>
      <OutlinedInput
        id="password"
        type={isVisible ? "text" : "password"}
        inputProps={inputProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={(event) => event.preventDefault()}
              edge="end"
              onClick={_handleClick}
            >
              {isVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
};
