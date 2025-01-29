import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "", // 'success', 'error', 'info', etc.
  isVisible: false,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message; // Fixed assignment syntax
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false; // Corrected property reference
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

// Thunk to show alert with a timeout
export const showAlertWithTimeout = (message, type) => (dispatch) => {
  dispatch(showAlert({ message, type }));
  setTimeout(() => {
    dispatch(hideAlert());
  }, 4000);
};

export default alertSlice.reducer;
