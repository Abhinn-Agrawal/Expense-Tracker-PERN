import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/auth";

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
