import React, { useState } from "react";
import { ButtonUnstyled } from "@mui/base";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/profile.css";
import { useEffect } from "react";

// URLs para manejo de datos en la BD
const usersURL = "https://cryptoaholic-api.vercel.app/users/";

function Profile() {
  // Constantes para cargar el login y el usuario
  const loadUserName = sessionStorage.getItem("nickName");
  const loadLogin = sessionStorage.getItem("loggedIn");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(usersURL + loadUserName);
      if (data.length > 0) {
        setUserName(data[0].nickName);
        setEmail(data[0].email);
        setTlf(data[0].phone);
        setFirstName(data[0].firstName);
        setLastName(data[0].lastName);
        setBirthday(data[0].birthday);
        setCountry(data[0].country);
        setGenre(data[0].gender);
      } else {
        console.log("Contenido no encontrado...");
      }
    };
    fetchUser();
  }, [userName, loadLogin, loadUserName]);

  // Función para gestionar el cierre de sesión
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="userform-container">
      <div className="profile-wrapper">
        <div className="profile-inner">
          <form>
            <h3>Perfil del usuario</h3>
            <div className="row g-3">
              <div className="col">
                <label>Nombre</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder={firstName}
                />
              </div>
              <div className="col">
                <label>Apellido</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder={lastName}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Nombre de usuario</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder={userName}
                />
              </div>
              <div className="col">
                <label>Teléfono</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder={tlf}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Fecha de nacimiento</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder={birthday}
                />
              </div>
              <div className="col">
                <label>País de residencia</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder={country}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Correo electrónico</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder={email}
                />
              </div>
              <div className="col">
                <label>Género</label>
                <input
                  disabled={true}
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder={genre}
                />
              </div>
            </div>
            <br></br>
            <div className="d-grid gap-2">
              <ButtonUnstyled
                onClick={() => navigate(-1)}
                className="btn btn-primary btn-block btn-lg"
              >
                Volver atrás
              </ButtonUnstyled>
              <ButtonUnstyled
                onClick={handleLogout}
                className="btn btn-danger btn-block btn-lg"
              >
                Cerrar sesión
              </ButtonUnstyled>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
