import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonUnstyled } from "@mui/base";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mantine/dates";
import { createStyles, Select } from "@mantine/core";
import { countryList } from "../data/Countries";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import "../css/userForm.css";

// Formato de fecha en español
require("dayjs/locale/es");
dayjs.locale("es");

// URLs para manejo de datos en la BD
const usersURL = "https://cryptoaholic-api.vercel.app/users/";
const registerURL = "https://cryptoaholic-api.vercel.app/register/";

// Expresión regular para validar formato de correo electrónico
const regExpMail = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

// Expresión regular para validar seguridad de la contraseña
const regExpPass = RegExp(
  // eslint-disable-next-line
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])(?=.{8,})/
);

// Expresión regular para validar formato de teléfono
const regExpTlf = RegExp(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/);

function Register() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [users, setUsers] = useState([]);
  const genders = ["Hombre", "Mujer"];

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [formatBD, setFormatBD] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [typePass, setTypePass] = useState("password");
  const [typeCPass, setTypeCPass] = useState("password");
  const [iconPass, setIconPass] = useState(faEyeSlash);
  const [iconCPass, setIconCPass] = useState(faEyeSlash);

  // Estilo para los inputs de las monedas
  const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
      alignItems: "center",
      color: "#00000000",
      fontFamily: "Poppins",
    },
    input: {
      border: "1px solid #c0d0d0",
      fontFamily: "Poppins",
      borderRadius: "7px",
      fontSize: "0.8rem",
      color: theme.black,
    },
  }));

  const { classes } = useStyles();

  // Extraer usuarios de la BD
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(usersURL);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(faEye);
      setTypePass("text");
    } else {
      setIconPass(faEyeSlash);
      setTypePass("password");
    }
  };

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(faEye);
      setTypeCPass("text");
    } else {
      setIconCPass(faEyeSlash);
      setTypeCPass("password");
    }
  };

  const formatBirthday = (birthday) => {
    var newBirthday = birthday.toString().split(" ");
    var dia = newBirthday[2];
    var mes = newBirthday[1];
    var anyo = newBirthday[3];
    // Convertir cada fecha en formato numérico
    if (mes === "Jan") {
      mes = "01";
    } else if (mes === "Feb") {
      mes = "02";
    } else if (mes === "Mar") {
      mes = "03";
    } else if (mes === "Apr") {
      mes = "04";
    } else if (mes === "May") {
      mes = "05";
    } else if (mes === "Jun") {
      mes = "06";
    } else if (mes === "Jul") {
      mes = "07";
    } else if (mes === "Aug") {
      mes = "08";
    } else if (mes === "Sep") {
      mes = "09";
    } else if (mes === "Oct") {
      mes = "10";
    } else if (mes === "Nov") {
      mes = "11";
    } else if (mes === "Dec") {
      mes = "12";
    }
    setFormatBD(dia + "-" + mes + "-" + anyo);
  };

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      password === "" ||
      email === "" ||
      country === "" ||
      gender === "" ||
      tlf === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar nombre de usuario existente
  const checkUserName = () => {
    if (users.find((elem) => elem.nickName === userName)) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar correo electrónico existente
  const checkEmail = () => {
    if (users.find((elem) => elem.email === email)) {
      return true;
    } else {
      return false;
    }
  };

  // Función para compronar si las contraseñas son iguales
  const checkPassword = () => {
    if (password !== cPassword) {
      return true;
    } else {
      return false;
    }
  };

  const checkUserNameLength = () => {
    if (
      errors.userName?.message ===
        "El nombre debe tener al menos 3 caracteres." ||
      errors.userName?.message ===
        "El nombre debe tener como máximo 30 caracteres."
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpPhone = () => {
    if (
      errors.tlf?.message ===
      "Número de teléfono no válido: formato XXX-XXX-XXX ó XXXXXXXXX."
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpEmail = () => {
    if (errors.email?.message === "Correo electrónico no válido.") {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpPassword = () => {
    if (
      errors.password?.message ===
      "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial."
    ) {
      return true;
    } else {
      return false;
    }
  };

  const registerUser = async () => {
    if (checkNullForm()) {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkUserName()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Ya existe un usuario con ese nombre.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkUserNameLength()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Nombre de usuario no válido.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkRegExpPhone()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Número de teléfono no válido.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkEmail()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Correo electrónico asociado a una cuenta existente.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkRegExpEmail()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Correo electrónico no válido.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkPassword()) {
      Swal.fire({
        title: "Error en el registro",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        timer: 2000,
      });
    } else if (checkRegExpPassword()) {
      Swal.fire({
        title: "Error en el registro",
        text: "La contraseña no es válida.",
        icon: "error",
        timer: 2000,
      });
    } else {
      await axios
        .post(registerURL, {
          firstName: firstName,
          lastName: lastName,
          nickName: userName,
          email: email,
          password: password,
          phone: tlf,
          birthday: formatBD,
          country: country,
          gender: gender,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              title: "Te has registrado correctamente.",
              text: "Inicia sesión ahora!",
              icon: "success",
              timer: 1000,
            }).then(() => {
              setTimeout(() => {
                window.location.replace("/login");
              }, 1500);
            });
          }
        });
    }
  };

  return (
    <div className="userform-container">
      <div className="reg-wrapper">
        <div className="reg-inner">
          <form autoComplete="off">
            <h3>Registra tu cuenta</h3>
            <div className="row g-3">
              <div className="col">
                <label>Nombre</label>
                <input
                  {...register("firstName", {
                    required: "Campo obligatorio.",
                  })}
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="Introduce tu nombre"
                  onChange={({ target }) => setFirstName(target.value)}
                />
                <p className="reg-warning">{errors.firstName?.message}</p>
              </div>
              <div className="col">
                <label>Apellido</label>
                <input
                  {...register("lastName", {
                    required: "Campo obligatorio.",
                  })}
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Introduce tu apellido"
                  onChange={({ target }) => setLastName(target.value)}
                />
                <p className="reg-warning">{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Nombre de usuario</label>
                <input
                  {...register("userName", {
                    required: "Campo obligatorio.",
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres.",
                    },
                    maxLength: {
                      value: 30,
                      message:
                        "El nombre debe tener como máximo 30 caracteres.",
                    },
                  })}
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Introduce tu nombre de usuario"
                  onChange={({ target }) => setUserName(target.value)}
                />
                <p className="reg-warning">{errors.userName?.message}</p>
              </div>
              <div className="col">
                <label>Teléfono</label>
                <input
                  {...register("tlf", {
                    required: "Campo obligatorio.",
                    pattern: {
                      value: regExpTlf,
                      message:
                        "Número de teléfono no válido: formato XXX-XXX-XXX ó XXXXXXXXX.",
                    },
                  })}
                  type="text"
                  className="form-control"
                  name="tlf"
                  placeholder="Introduce tu número de teléfono"
                  onChange={({ target }) => setTlf(target.value)}
                />
                <p className="reg-warning">{errors.tlf?.message}</p>
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>País de residencia</label>
                <Select
                  searchable
                  nothingFound="Sin opciones"
                  style={{ zIndex: 2 }}
                  data={countryList}
                  placeholder="Selecciona tu país de residencia"
                  classNames={classes}
                  onSelect={(e) => setCountry(e.target.value)}
                />
                <p />
              </div>
              <div className="col">
                <label>Fecha de nacimiento</label>
                <DatePicker
                  value={birthday}
                  placeholder="¿Qué día naciste?"
                  clearable={false}
                  classNames={classes}
                  onChange={setBirthday}
                  locale="es"
                  labelFormat="MMMM YYYY"
                  onDropdownClose={() => formatBirthday(birthday)}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Correo electrónico</label>
                <input
                  {...register("email", {
                    required: "Campo obligatorio.",
                    pattern: {
                      value: regExpMail,
                      message: "Correo electrónico no válido.",
                    },
                  })}
                  type="text"
                  className="form-control form-control-mail"
                  name="email"
                  placeholder="Introduce tu correo electrónico"
                  onChange={({ target }) => setEmail(target.value)}
                />
                <p className="reg-warning">{errors.email?.message}</p>
              </div>
              <div className="col">
                <label>Género</label>
                <Select
                  searchable
                  nothingFound="Sin opciones"
                  style={{ zIndex: 2 }}
                  data={genders}
                  placeholder="Selecciona tu género"
                  classNames={classes}
                  onSelect={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
            <div className="row g-3">
              <div className="col">
                <label>Contraseña</label>
                <div className="input-group mb-3">
                  <input
                    {...register("password", {
                      required: "Campo obligatorio.",
                      pattern: {
                        value: regExpPass,
                        message:
                          "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial.",
                      },
                    })}
                    type={typePass}
                    className="form-control"
                    name="password"
                    placeholder="Introduce tu contraseña"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <ButtonUnstyled className="show-btn" onClick={handleToggle}>
                    <FontAwesomeIcon icon={iconPass} />
                  </ButtonUnstyled>
                </div>
                <p className="reg-warning-pass">{errors.password?.message}</p>
              </div>
              <div className="col">
                <label>Confirmar contraseña</label>
                <div className="input-group mb-3">
                  <input
                    {...register("cPassword", {
                      required: "Campo obligatorio.",
                      pattern: {
                        value: regExpPass,
                        message:
                          "La contraseña debe tener al menos 8 caracteres y contener una mayúscula, una minúscula, un número y un carácter especial.",
                      },
                    })}
                    type={typeCPass}
                    className="form-control"
                    name="cPassword"
                    placeholder="Confirma tu contraseña"
                    onChange={({ target }) => setCPassword(target.value)}
                  />
                  <ButtonUnstyled className="show-btn" onClick={handleToggle2}>
                    <FontAwesomeIcon icon={iconCPass} />
                  </ButtonUnstyled>
                </div>
                <p className="reg-warning-pass">{errors.cPassword?.message}</p>
              </div>
            </div>
            <br></br>
            <div className="d-grid gap-2">
              <button
                type="button"
                onClick={registerUser}
                className="btn btn-primary btn-block btn-lg"
              >
                Registrar
              </button>
            </div>
            <br></br>
            <h1 className="generic-text">
              ¿Ya te has registrado?{" "}
              <Link className="reset-link" to="/login">
                Inicia sesión
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
