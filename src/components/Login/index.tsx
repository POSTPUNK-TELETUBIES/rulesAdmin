import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/auth";
import { Password } from "./Password";

interface LoginFields {
  email: string;
  password: string;
}

export function Login() {
  const { handleSubmit, register } = useForm();
  const authClient = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const _handleSubmit: SubmitHandler<LoginFields> = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      await authClient.login(email, password);
      setIsLoading(false);
    },
    [authClient]
  );

  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit(_handleSubmit)}
      spacing={2}
      p={2}
    >
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={"email"}>Email</InputLabel>
        <OutlinedInput id="email" inputProps={register("email")} />
      </FormControl>
      <Password disabled={isLoading} inputProps={register("password")} />
      {!isLoading ? (
        <Button type="submit" variant="contained">
          Login
        </Button>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
}
