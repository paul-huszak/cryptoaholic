import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/coinList.css";

function Loading() {
  return (
    <div className="coinlist-container">
      <h2>
        Cargando...
        <div className="spinner">
          <p>
            <CircularProgress color="inherit" />
          </p>
        </div>
      </h2>
    </div>
  );
}

export default Loading;
