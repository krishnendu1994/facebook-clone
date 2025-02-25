import { createContext, useState, useEffect } from "react";
import { loginUser, refreshToken } from "../api/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh") || null);

  useEffect(() => {
    if (token) {
      // Decode token to get user info
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser({ username: userData.username });
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setToken(response.data.access);
      setRefresh(response.data.refresh);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  const logout = () => {
    setToken(null);
    setRefresh(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
