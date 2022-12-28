import React from "react";
import "./SnackBar.css";

const SnackBar = ({ message }) => {
  return <div className="snackbar">{message}</div>;
};

export default SnackBar;
