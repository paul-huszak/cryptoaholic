import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import Err404 from "../images/image.svg";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="App-header">
      <div className="container">
        <div className="row">
          <div className="col col-err">
            <h1>Algo no ha ido bien...</h1>
            <h4 className="text-err">
              La página que estás intentando abrir no existe. Puede que hayas
              introducido mal la dirección, o que la página haya sido movida a
              otra URL.
            </h4>
            <div className="button-return">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-light"
              >
                Volver atrás
              </button>
            </div>
          </div>
          <div className="col col-img">
            <img src={Err404} alt="Error404" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
