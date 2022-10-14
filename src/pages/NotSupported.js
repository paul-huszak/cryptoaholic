import React from "react";
import "../css/notSupported.css";
import UnSupported from "../images/no-smartphones.png";

function NotFound() {
  return (
    <div className="notSupp-header">
      <div className="text">
        <h1>Dispositivo no soportado...</h1>
        <h4 className="text-err">
          Tu dispositivo no es compatible con la página que deseas encontrar.
          ¡Estamos trabajando en ello para implementar nuevas mejoras cuanto
          antes!
        </h4>
      </div>
      <div className="image">
        <img src={UnSupported} alt="Device not supported" width="250px" />
      </div>
    </div>
  );
}

export default NotFound;
