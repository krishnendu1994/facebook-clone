import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { registerUser } from "../api/auth"; // Import the register function

const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    birthday: "",
    gender: "",
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(""); // Success or error message

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.first_name || !user.last_name || !user.email || !user.password || !user.password2 || !user.birthday || !user.gender) {
      setError(true);
      setMessage("All fields are required.");
      return;
    }

    if (user.password !== user.password2) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser(user);
      
      setMessage("Registered successfully!");
        window.location ='#/login';
    } catch (err) {
      setMessage(err.response.data.email);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        padding: "5px 20px",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "5px 20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold", color: "#000", marginBottom: "20px" }}>
          Create a new account
        </Typography>
        <Typography sx={{ fontSize: "1rem", color: "#606770", marginBottom: "10px" }}>
          It's quick and easy.
        </Typography>
        <Divider />

        {message && (
          <Typography color={error ? "error" : "primary"} sx={{ marginTop: "10px" }}>
            {message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} autoComplete="on">
          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item xs={6}>
              <TextField
                error={error && !user.first_name}
                helperText={error && !user.first_name ? "Required" : ""}
                variant="outlined"
                fullWidth
                label="First Name"
                name="first_name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={error && !user.last_name}
                helperText={error && !user.last_name ? "Required" : ""}
                variant="outlined"
                fullWidth
                label="Last Name"
                name="last_name"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <TextField
            error={error && !user.email}
            helperText={error && !user.email ? "Required" : ""}
            sx={{ marginTop: "15px" }}
            variant="outlined"
            fullWidth
            label="Mobile number or email"
            name="email"
            onChange={handleChange}
          />

          <TextField
            error={error && !user.password}
            helperText={error && !user.password ? "Required" : ""}
            sx={{ marginTop: "15px" }}
            variant="outlined"
            fullWidth
            type="password"
            label="New Password"
            name="password"
            onChange={handleChange}
          />

          <TextField
            error={error && !user.password2}
            helperText={error && !user.password2 ? "Required" : ""}
            sx={{ marginTop: "15px" }}
            variant="outlined"
            fullWidth
            type="password"
            label="Repeat Password"
            name="password2"
            onChange={handleChange}
          />

          <TextField
            error={error && !user.birthday}
            helperText={error && !user.birthday ? "Required" : ""}
            sx={{ marginTop: "15px" }}
            variant="outlined"
            fullWidth
            type="date"
            label="Birthday"
            name="birthday"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />

          <Select
            error={error && !user.gender}
            displayEmpty
            sx={{ marginTop: "15px", width: "100%" }}
            name="gender"
            value={user.gender}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </Select>
          {error && !user.gender && <Typography color="error">Required</Typography>}

          <Typography sx={{ fontSize: "0.8rem", color: "#606770", marginTop: "10px" }}>
            By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy.
          </Typography>

          <Button
            sx={{
              backgroundColor: "#42b72a",
              color: "#fff",
              padding: "10px",
              marginTop: "15px",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#36a420",
              },
            }}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>

        <Typography sx={{ marginTop: "15px", fontSize: "0.9rem", color: "#606770" }}>
          Already have an account? <Link to="/login" style={{ color: "#1877f2", fontWeight: "bold" }}>Log In</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Register;
