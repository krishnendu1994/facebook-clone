import React from 'react';
import { Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Dashboard from './Page/Dashboard.jsx';
import Error from './Page/Error.jsx';
import FacebookView from './Page/FacebookView.jsx';
import Login from './Page/Login.jsx';
import Register from './Page/Register.jsx';
import '../src/index.css';

import App from './App.jsx';
import ThemeContextProvider from './context/ThemeContext';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import it

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Default route redirects to login
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error error={true} />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error error={true} />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    // errorElement: <Error error={true} />,
  },
  {
    path: "/postview",
    element: (
      <ProtectedRoute>
        <Dashboard page="preview" />
      </ProtectedRoute>
    ),
    errorElement: <Error error={true} />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
