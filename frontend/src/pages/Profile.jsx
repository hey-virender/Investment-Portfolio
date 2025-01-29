import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "../api/axiosInstance";
import { showAlertWithTimeout } from "../store/alertSlice";
import { login } from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const { name: initialName, email: initialEmail } = useSelector(
    (state) => state.auth.user,
  );

  const [name, setName] = useState(initialName);
  const [originalPassword, setOriginalPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOriginalPassword, setShowOriginalPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle updating the name
  const handleUpdateName = async () => {
    if (!name || !originalPassword) {
      dispatch(showAlertWithTimeout("All fields are required", "error"));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put("/auth/update", {
        name,
        password: originalPassword,
      });
      dispatch(showAlertWithTimeout(response.data.message, "success"));
      dispatch(login(response.data.data));
      setOpenNameDialog(false);
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle updating the password
  const handleUpdatePassword = async () => {
    if (!originalPassword || !newPassword || !confirmPassword) {
      dispatch(showAlertWithTimeout("All fields are required", "error"));
      return;
    }
    if (newPassword !== confirmPassword) {
      dispatch(showAlertWithTimeout("Passwords do not match", "error"));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put("/auth/update", {
        password: originalPassword,
        newPassword,
      });
      dispatch(showAlertWithTimeout(response.data.message, "success"));
      setOpenPasswordDialog(false);
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
              <AccountCircleIcon sx={{ width: 100, height: 100 }} />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {initialName}
            </Typography>
            <Typography color="textSecondary">{initialEmail}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setOpenNameDialog(true)}
              >
                Update Name
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setOpenPasswordDialog(true)}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dialog for Updating Name */}
      <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
        <DialogTitle>Update Name</DialogTitle>
        <DialogContent>
          <TextField
            label="New Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Original Password"
            type={showOriginalPassword ? "text" : "password"}
            value={originalPassword}
            onChange={(e) => setOriginalPassword(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowOriginalPassword((prev) => !prev)
                    }
                  >
                    {showOriginalPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNameDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateName}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Updating Password */}
      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Original Password"
            type={showOriginalPassword ? "text" : "password"}
            value={originalPassword}
            onChange={(e) => setOriginalPassword(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowOriginalPassword((prev) => !prev)
                    }
                  >
                    {showOriginalPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenPasswordDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePassword}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
