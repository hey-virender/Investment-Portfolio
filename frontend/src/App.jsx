import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import StockTrade from "./pages/StockTrade";
import Header from "./components/Header";
import { hideAlert } from "./store/alertSlice";
import { Alert, Snackbar } from "@mui/material";
import Profile from "./pages/Profile";
import Strategies from "./pages/Strategies";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { message, type, isVisible } = useSelector((state) => state.alert);
  const handleClose = () => {
    dispatch(hideAlert());
  };
  return (
    <Router>
      <Snackbar open={isVisible} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {isAuthenticated && <Header />}{" "}
      {/* Show Header only when authenticated */}
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Auth />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/trade" element={<StockTrade />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/strategies" element={<Strategies />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
