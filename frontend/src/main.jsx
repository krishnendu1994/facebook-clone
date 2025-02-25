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
    element: <App></App>,
    errorElement: <Error error={true}></Error>
  },
  {
    path: "/Login",
    element: <Login></Login>,
    errorElement: <Error error={true}></Error>
  },
  {
    path: "/Register",
    element: <Register></Register>,
    errorElement: <Error error={true}></Error>
  },
   {
    path: "/Dashboard",
    element: (
      <ProtectedRoute> 
        <Dashboard />
      </ProtectedRoute>
    ),
    // errorElement: <Error errors={true} />,
  },
  {
    path: "/PostView",
    element: <Dashboard page='preview'></Dashboard>,
    errorElement: <Error errors={true}></Error>
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
