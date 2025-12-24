import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Email format validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // 🔹 Empty fields
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // 🔹 Invalid email
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      // 🔹 Invalid credentials
      if (!res?.data) {
        setErrorMsg("Invalid email or password.");
        return;
      }

      login(res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      // 🔹 Backend not running / network error
      if (!error.response) {
        setErrorMsg(
          "Server is not reachable. Please make sure backend is running."
        );
      }
      // 🔹 Unauthorized
      else if (error.response.status === 401) {
        setErrorMsg("Invalid email or password.");
      }
      // 🔹 Server error
      else if (error.response.status >= 500) {
        setErrorMsg("Server error. Please try again later.");
      }
      // 🔹 Generic error
      else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        {/* 🔷 HEADER */}
        <Typography variant="h4" align="center" gutterBottom>
          Expense Sharing
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Login
        </Typography>

        {/* 🔴 Error Message */}
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography align="center" mt={2}>
          Don’t have an account?{" "}
          <Link component="button" onClick={() => navigate("/register")}>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
