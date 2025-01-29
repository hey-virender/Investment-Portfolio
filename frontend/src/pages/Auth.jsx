import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useAxios } from "../api/axiosInstance";
import { showAlertWithTimeout } from "../store/alertSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const [current, setCurrent] = useState("login");

  const toggleSection = (value) => {
    setCurrent(value);
  };
  const handleSubmit = async (data) => {
    if (current == "signup") {
      if (data.password !== data.confirmPassword) {
        return alert("Passwords do not match!");
      }
      try {
        const response = await axios.post("/auth/sign-up", data);
        if (response.status === 201) {
          dispatch(
            showAlertWithTimeout( "User created successfully",
              "success",
            ),
          );
          dispatch(login(response.data.data));
        }
      } catch (error) {
        console.log("An error occurred");
      }
    } else if (current == "login") {
      try {
        const response = await axios.post("/auth/login", data);
        if (response.status === 200) {
          dispatch(showAlertWithTimeout("Logged in successfully", "success"));
          dispatch(login(response.data.data));
        }
        
      } catch (error) {
        console.log("An error occurred");
      }
    }
  };
  return (
    <div className="min-h-screen max-h-screen relative">
      <Typography variant="h4" align="center" sx={{ mt: 4 }} gutterBottom>
        Investment Portfolio
      </Typography>
      <AuthForm mode={current} onSectionChange={toggleSection} onSubmit={handleSubmit} />
 
    </div>
  );
};

export default Auth;
