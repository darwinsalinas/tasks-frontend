import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FaLock as LockOutlinedIcon } from "react-icons/fa";
import { login } from "../services/login.service";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  const notify = (message: string) => toast(message, { type: "error" });

  if (authContext.user?.token) {
    navigate("/");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    login({
      email: data.get("email") as string,
      password: data.get("password") as string,
    })
      .then((data) => {
        if (data.token) {
          authContext.login(data);
          navigate("/");
        }

        if (data.statusCode >= 400) {
          notify("Error al inciar sesión, revisa tus credenciales");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        notify("Estamos teniendo problemas, intenta más tarde");
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            defaultValue={"admin@gmail.com"}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            defaultValue={"secret"}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Inciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
