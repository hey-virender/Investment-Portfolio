import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Sidebar from "./Sidebar";
import ExitToAppSharpIcon from "@mui/icons-material/ExitToAppSharp";
import { useAxios } from "../api/axiosInstance";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getInitials } from "../constants";
import { showAlertWithTimeout } from "../store/alertSlice";
import { useNavigate } from "react-router-dom";


const StyledAppBar = styled(AppBar)({
  backgroundColor: "#3b7fce", // Change to your preferred color
  boxShadow: "none",
});

const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  backgroundColor: "#ff5722", // Avatar background color
  fontSize: "1rem",
});

const Header = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout");
      if (response.status === 200) {
        dispatch(logout());
        dispatch(showAlertWithTimeout("Logged out successfully", "success"));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <Sidebar />
        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1rem", // Small screens
              sm: "1.25rem", // Medium screens
              md: "1.5rem", // Larger screens
            },
          }}
        >
          Investment Portfolio
        </Typography>

        {/* Avatar */}
        <Box display="flex" alignItems="center" gap={1}>
          <StyledAvatar alt="User Name">{getInitials(name)}</StyledAvatar>
          <Button variant="contained" onClick={handleLogout}>
            <ExitToAppSharpIcon />
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
