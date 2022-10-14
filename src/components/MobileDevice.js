import React from "react";
import { Navigate } from "react-router-dom";

const MobileDevice = ({ windowSize, children }) => {
  if (windowSize <= 1368) {
    return <Navigate to="/not-supported" replace />;
  }
  return children;
};

export default MobileDevice;
