import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const inputHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axiosInstance.post("/loginAdmin", admin);

      if (result.status == 200) {
        localStorage.setItem("token", result?.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err.message);
      alert("Please Enter valid credentials ");
    }

    // Simple validation
    if (!admin.email || !admin.password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    // Submit the login details here (for now we just log them)

    // You can replace this with your API call to authenticate the user.
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: 3,
          marginTop: 15,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
            name="email"
            margin="normal"
            onChange={inputHandler}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            name="password"
            margin="normal"
            onChange={inputHandler}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
