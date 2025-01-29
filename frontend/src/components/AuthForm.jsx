import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from "prop-types";

const AuthForm = ({ mode, onSectionChange, onSubmit }) => {
  // Mode: 'signup' or 'login'
  const isSignup = mode === "signup";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
        {isSignup ? "Sign Up" : "Login"}
      </Typography>

      {isSignup && (
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      )}

      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={formData.email}
        onChange={handleInputChange}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        required
        value={formData.password}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {isSignup && (
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          required
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
      >
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      <Typography
        className="cursor-pointer"
        variant="body2"
        textAlign="center"
        onClick={() => onSectionChange(isSignup ? "login" : "signup")}
        mt={2}
        color="text.secondary"
      >
        {isSignup
          ? "Already have an account? Log in."
          : "Don't have an account? Sign up."}
      </Typography>
    </Box>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  mode: PropTypes.oneOf(["signup", "login"]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};
