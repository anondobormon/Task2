import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivetRoute({ children }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  if (loading == false && isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
