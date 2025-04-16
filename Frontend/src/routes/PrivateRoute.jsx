import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  return token ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;