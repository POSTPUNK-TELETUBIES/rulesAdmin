import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../context/auth";
import { Password } from "./Password";
import { Person } from "@mui/icons-material";

interface LoginFields {
  email: string;
  password: string;
}

interface LoginProps {
  singUpClick?: () => void;
}

export function Login({ singUpClick }: LoginProps) {
  const { handleSubmit, register, resetField } = useForm();
  const authClient = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const _handleSubmit: SubmitHandler<LoginFields> = useCallback(
    async ({ email, password }) => {
      setIsLoading(true);
      resetField("password");
      await authClient.login(email, password);
      setIsLoading(false);
    },
    [authClient, resetField]
  );

  return (
    <Stack
      component={"form"}
      onSubmit={handleSubmit(_handleSubmit)}
      spacing={2}
      p={2}
    >
      <Box display="flex" justifyContent="center">
        <Person
          sx={{
            fontSize: "10vh",
            borderRadius: "50%",
            border: "2px solid gray",
          }}
        />
      </Box>
      <FormControl disabled={isLoading}>
        <InputLabel htmlFor={"email"}>Email</InputLabel>
        <OutlinedInput
          id="email"
          label="Email"
          inputProps={register("email")}
        />
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
      <Typography align="center">
        ¿Aún no te registras? <Link onClick={singUpClick}>Sing up</Link>{" "}
      </Typography>
    </Stack>
  );
}
