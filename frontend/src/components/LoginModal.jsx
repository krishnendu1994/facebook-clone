import React, { useState } from 'react';
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import '../App.css';
import { loginUser } from "../api/auth";
import { Link } from 'react-router-dom';
const Login = () => {
  const [errorLog, setErrorLog] = useState(false);
  const loginContainerStyles = {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px 20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  };
  const handleProceedRegister = () => {
    window.location.hash='/register';
  };
  const titleStyles = {
    marginBottom: '20px',
    color: '#1877f2',
    fontWeight: 'bold',
    fontSize: '2rem',
  };

  const formStyles = {
    width: '100%',
  };

  const textFieldStyles = {
    marginBottom: '20px',
  };

  const loginButtonStyles = {
    backgroundColor: '#FF5733',
    color: '#fff',
    fontWeight:"bold",
    padding: '10px 20px',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#165db7',
    },
  };

  const signUpTextStyles = {
    marginTop: '20px',
    fontSize: '0.9rem',
    color: '#606770',
  };

  const signUpLinkStyles = {
    color: '#1877f2',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const [user, setUser] = useState({ username: '', password: '' });
  const submit = async (e) => {
    e.preventDefault();
  try {
    const response = await loginUser(user);

    // Store tokens in local storage
    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    // Redirect user to dashboard
    window.location.hash = "/dashboard";
  } catch (error) {
    console.error("Login failed:", error);
    setErrorLog(true);
  }
  }
  const handleUser = (event) => {
    // Extract the name and value of the input field that triggered the change
    const { name, value } = event.target;

    // Update the user state based on the input field name
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value, // Update the corresponding field in the user object
    }));
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Container sx={loginContainerStyles}>
        <Box component='form' sx={formStyles} onSubmit={submit} autoComplete="on">
          <TextField
            {...(errorLog ? { error: true, helperText: "Invalid Username" } : {})}
            sx={textFieldStyles}
            variant="outlined"
            fullWidth
            label="Email or Phone"
            name="username"
            onChange={handleUser}
            required
          />
          <TextField
            {...(errorLog ? { error: true, helperText: "Invalid Password" } : {})}
            sx={textFieldStyles}
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            label="Password"
            onChange={handleUser}
            required
          />
          <Button
            sx={loginButtonStyles}
            type="submit"
            fullWidth
            variant="contained"
          >
            Log In
          </Button>
        </Box>
        <Typography sx={signUpTextStyles}>
          Don't have an account?{' '}
          <Link to="/register" style={signUpLinkStyles}>
            Sign Up
          </Link >
        </Typography>
        <Divider sx={{ marginTop: '6%', marginBottom: '6%' }}></Divider>
        <Button onClick={handleProceedRegister}
          color='success'
          sx={{
              backgroundColor: "#42b72a",
              color: "#fff",
              padding: "10px",
              marginTop: "15px",
              fontWeight:"bold",
              width: "50%",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#36a420",
              },
            }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Create new account
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
