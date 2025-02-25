import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const registerUser = async (userData) => {
  return axios.post(`${API_URL}register/`, userData);
};

export const loginUser = async (userData) => {
  return axios.post(`${API_URL}token/`, userData);
};

export const refreshToken = async (refresh) => {
  return axios.post(`${API_URL}token/refresh/`, { refresh });
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token
  console.log('jhgjh');

  if (!refreshToken) {
    console.error("No refresh token found!");
    return;
  }

  return axios.post(`${API_URL}logout/`, { refresh_token: refreshToken });
};
