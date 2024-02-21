import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../components/Theme";
import { apiLogin, requestMapper, responseMapper } from "../../api/apiLogin";
import { Alert, FormControlLabel, IconButton, InputAdornment, Switch } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = theme;

export default function Login() {
  const [safeLogin, setSafeLogin] = React.useState(true);
  const [loginError, setLoginError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("Something unexpected happened");
  const [showPassword, setShowPassword] = React.useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await apiLogin(requestMapper({
        username: data.get("username") as string,
        password: data.get("password") as string,
        isSafe: safeLogin,
      }));
      const responseData = responseMapper(response);
      console.log(responseData);
      if (responseData.status === "failed") {
        setLoginError(true);
        setErrorMsg(responseData.message);
      }
      else {
        setLoginError(false);
        setErrorMsg("");
        login({username: data.get("username") as string});
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
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
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={e => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {loginError && <Alert severity="error">{errorMsg}</Alert>}
              <FormControlLabel
                control={<Switch checked={safeLogin} onChange={() => setSafeLogin(!safeLogin)} />}
                label="Safe login"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
