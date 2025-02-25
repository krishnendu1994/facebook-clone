import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;  // ✅ Returns `true` if token exists, `false` otherwise
};

const ProtectedRoute = ({ children }) => {
  return useAuth() ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
