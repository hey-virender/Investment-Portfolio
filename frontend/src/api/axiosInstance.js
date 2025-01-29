import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { showAlertWithTimeout } from "../store/alertSlice";
// Replace with your actual action file

const createAxiosInstance = (dispatch, navigate) => {
  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // Replace with your API base URL
    timeout: 5000, // Request timeout in milliseconds
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // If the response is successful (status code 2xx), return the response
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("Error 404: Unauthorized access detected.");
        // Dispatch an error action
        dispatch(logout());
        navigate("/");

        // Handle additional 404 logic here (e.g., logout, redirect, etc.)
      }
      dispatch(showAlertWithTimeout(error.response.data.message, "error"));
      return Promise.reject(error); // Reject the promise with the error
    },
  );

  return axiosInstance;
};

export const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the dispatch function
  return createAxiosInstance(dispatch, navigate); // Pass it to createAxiosInstance
};
