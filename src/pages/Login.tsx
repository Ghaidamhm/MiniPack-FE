import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginUserAsync, profileUserAsync } from "../app/redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";

const theme = createTheme();

export default function Login(props:any) {
  const { auth, user, ErrorMessage } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data: any) => {
    dispatch(loginUserAsync(data));
    reset();
  };

  useEffect(() => {
    if (auth) {
      dispatch(profileUserAsync(auth));
      if(props.modalOpen){
        props.handleClose(false)
        
      }
      else{ navigate('/')}
    }
  }, [auth]);

  function getErrorMessage(error: any, field: string): string {
    if (error && error[field]) return error[field].message;
    return "";
  }

  return ( <>       
    <ThemeProvider theme={theme}>
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              type="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is not correct",
                },
              })}
              error={errors.email && errors.email.message !== undefined}
              helperText={getErrorMessage(errors, "email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              error={errors.password && errors.password.message !== undefined}
              helperText={getErrorMessage(errors, "password")}
            />
            {/*
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
             */}
            <Button
              type="submit"
              fullWidth
              className="btn btn-outline-primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            Not a Member? <Link to={'/sign-up'}>Signup now </Link>
            <Typography component="h3" variant="h5" color="#f00">
              {ErrorMessage}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   </>
  );
}
