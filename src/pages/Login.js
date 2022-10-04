import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonUnstyled } from "@mui/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/userForm.css";

// URLs para manejo de datos en la BD
const loginURL = "https://cryptoaholic-api.vercel.app/login/";

function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  // Función de inicio de sesión
  const handleLogin = (event) => {
    event.preventDefault();
    // Comprobar si hay campos vacíos
    if (nickName === "" || password === "") {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        timer: 2000,
      });
    } else {
      loginUser();
    }
  };

  // Petición a la API de Cryptoaholic para realizar login
  const loginUser = async () => {
    await axios
      .post(loginURL, { nickName: nickName, password: password })
      .then((response) => {
        if (response.status === 200) {
          if (nickName === "admin") {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("adminLogin", true);
            setTimeout(() => {
              window.location.replace("/management");
            }, 500);
          } else {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            setTimeout(() => {
              window.location.replace("/my-coins");
            }, 500);
          }
        } else {
          Swal.fire({
            title: "Usuario o contraseña incorrecto!",
            text: "Inténtalo de nuevo",
            icon: "error",
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Usuario o contraseña incorrecto!",
          text: "Inténtalo de nuevo",
          icon: "error",
          timer: 2000,
        });
      });
  };

  // Mostrar contraseña
  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  return (
    <div className="userform-container">
      <div className="log-wrapper">
        <div className="log-inner">
          <form autoComplete="off">
            <h3>Inicia sesión con tu cuenta</h3>
            <div className="form-group">
              <label>Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                name="Username"
                placeholder="Introduce tu nombre de usuario"
                onChange={({ target }) => setNickName(target.value)}
              />
            </div>
            <p></p>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-group mb-3">
                <input
                  type={type}
                  className="form-control"
                  name="Password"
                  placeholder="Introduce tu contraseña"
                  onChange={({ target }) => setPassword(target.value)}
                />
                <ButtonUnstyled className="show-btn" onClick={handleToggle}>
                  <FontAwesomeIcon icon={icon} />
                </ButtonUnstyled>
              </div>
            </div>
            <p></p>
            <br></br>
            <div className="d-grid gap-2">
              <button
                type="button"
                onClick={handleLogin}
                className="btn btn-primary btn-block btn-lg"
              >
                Iniciar sesión
              </button>
            </div>
            <br></br>
            <h1 className="generic-text">
              ¿Todavía no tienes cuenta?{" "}
              <Link className="reset-link" to="/register">
                Registrar
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
