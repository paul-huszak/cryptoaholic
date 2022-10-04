import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import countryCodeISO from "../data/countryCodeISO.json";
import axios from "axios";
import Loading from "../components/Loader";
import moment from "moment/moment";
import Swal from "sweetalert2";
import "../css/adminPage.css";

// URL para extraer las banderas de los países
const flagsURL = "https://countryflagsapi.com/svg/";

// URLs para manejo de datos en la BD
const usersURL = "https://cryptoaholic-api.vercel.app/users/";
const userDelURL = "https://cryptoaholic-api.vercel.app/deleteUser/";

function Management() {
  const navigate = useNavigate();

  // Constantes de manejo de datos y paginación
  const usersPerPage = 10;
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(usersPerPage);
  const [query, setQuery] = useState("");
  const [closeVisibility, setCloseVisibility] = useState(false);

  // Constantes de dirección del orden en la tabla
  const [directionName, setDirectionName] = useState("ASC");
  const [directionCountry, setDirectionCountry] = useState("ASC");
  const [directionGender, setDirectionGender] = useState("ASC");
  const [directionAge, setDirectionAge] = useState("ASC");

  // Constantes de iconos del orden en la tabla
  const [iconName, setIconName] = useState(faSort);
  const [iconCountry, setIconCountry] = useState(faSort);
  const [iconGender, setIconGender] = useState(faSort);
  const [iconAge, setIconAge] = useState(faSort);

  // Descargar usuarios a través de la API de Cryptoaholic
  const fetchUsers = async () => {
    // Variables temporales que se actualizan en el mismo render
    // (a diferencia del hook useState).
    let getCountries = [];
    countryCodeISO.map((countryItem) => getCountries.push(countryItem));
    // Obtener usuarios de la base de datos de CoinGecko
    await axios
      .get(usersURL)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchUsers();
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Función para introducir la búsqueda en la barra
  const inputQuery = (e) => {
    setQuery(e.target.value);
    setCloseVisibility(true);
  };

  // Función para limpiar la búsqueda de la barra
  const clearInput = () => {
    setQuery("");
    setCloseVisibility(false);
  };

  // Función para cargar más usuarios
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + usersPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("top-index-users");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleDeleteUser = (user) => {
    if (user.nickName === "admin") {
      Swal.fire({
        title: "¡Acción denegada!",
        text: "No puedes eliminar a este usuario...",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "¿Deseas eliminar el usuario?",
        text: "¡Los cambios serán irreversibles!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡elimínalo!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(userDelURL + user.nickName);
          Swal.fire({
            title: "¡Éxito!",
            text: "El usuario se ha eliminado correctamente.",
            icon: "success",
            timer: 1000,
          }).then(() => {
            fetchUsers();
          });
        }
      });
    }
  };

  // Ordenar por nombre
  const sortByName = () => {
    if (directionName === "ASC") {
      setUser(
        user.sort((a, b) =>
          a.nickName.toLowerCase() > b.nickName.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortUp);
      setDirectionName("DESC");
    } else if (directionName === "DESC") {
      setUser(
        user.sort((a, b) =>
          a.nickName.toLowerCase() < b.nickName.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortDown);
      setDirectionName("ASC");
    } else {
      return user;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionCountry("ASC");
    setIconCountry(faSort);
    setDirectionGender("ASC");
    setIconGender(faSort);
    setDirectionAge("ASC");
    setIconAge(faSort);
  };

  // Ordenar por país
  const sortByCountry = () => {
    if (directionCountry === "ASC") {
      setUser(
        user.sort((a, b) =>
          a.country.toLowerCase() > b.country.toLowerCase() ? 1 : -1
        )
      );
      setIconCountry(faSortUp);
      setDirectionCountry("DESC");
    } else if (directionCountry === "DESC") {
      setUser(
        user.sort((a, b) =>
          a.country.toLowerCase() < b.country.toLowerCase() ? 1 : -1
        )
      );
      setIconCountry(faSortDown);
      setDirectionCountry("ASC");
    } else {
      return user;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionAge("ASC");
    setIconAge(faSort);
    setDirectionGender("ASC");
    setIconGender(faSort);
  };

  // Ordenar por género
  const sortByGender = () => {
    if (directionGender === "ASC") {
      setUser(
        user.sort((a, b) =>
          a.gender.toLowerCase() > b.gender.toLowerCase() ? 1 : -1
        )
      );
      setIconGender(faSortUp);
      setDirectionGender("DESC");
    } else if (directionGender === "DESC") {
      setUser(
        user.sort((a, b) =>
          a.gender.toLowerCase() < b.gender.toLowerCase() ? 1 : -1
        )
      );
      setIconGender(faSortDown);
      setDirectionGender("ASC");
    } else {
      return user;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionAge("ASC");
    setIconAge(faSort);
    setDirectionCountry("ASC");
    setIconCountry(faSort);
  };

  // Ordenar por edad
  const sortByAge = () => {
    if (directionAge === "ASC") {
      setUser(
        user.sort((a, b) =>
          a.birthday.toLowerCase() > b.birthday.toLowerCase() ? 1 : -1
        )
      );
      setIconAge(faSortUp);
      setDirectionAge("DESC");
    } else if (directionAge === "DESC") {
      setUser(
        user.sort((a, b) =>
          a.birthday.toLowerCase() < b.birthday.toLowerCase() ? 1 : -1
        )
      );
      setIconAge(faSortDown);
      setDirectionAge("ASC");
    } else {
      return user;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionCountry("ASC");
    setIconCountry(faSort);
    setDirectionGender("ASC");
    setIconGender(faSort);
  };

  // Mostrar cabecera
  const displayHeader = () => {
    return (
      <table className="table table-striped table-dark table-bordered align-middle">
        <thead>
          <tr>
            <th onClick={sortByName} width="20%" scope="col">
              Nombre
              <FontAwesomeIcon className="sort" icon={iconName} />
            </th>
            <th onClick={sortByGender} width="20%" scope="col">
              Género
              <FontAwesomeIcon className="sort" icon={iconGender} />
            </th>
            <th onClick={sortByAge} width="20%" scope="col">
              Edad
              <FontAwesomeIcon className="sort" icon={iconAge} />
            </th>
            <th onClick={sortByCountry} width="20%" scope="col">
              País
              <FontAwesomeIcon className="sort" icon={iconCountry} />
            </th>
            <th width="10%" scope="col">
              Acción
            </th>
          </tr>
        </thead>
      </table>
    );
  };

  const displayUsers = user
    // eslint-disable-next-line
    .filter((value) => {
      if (query === "") {
        return value;
      } else if (
        value.nickName.toLowerCase().includes(query.toLocaleLowerCase())
      ) {
        return value;
      }
    })
    .slice(0, paginate)
    .map((userItem) => {
      const { idUser, nickName, gender, country, birthday } = userItem;
      let countryFound = countryCodeISO.find((elem) => elem.name === country);
      return (
        <div key={idUser}>
          <table className="table table-striped table-dark table-bordered table-hover align-middle">
            <tbody>
              <tr>
                <th width="20%" scope="row">
                  {nickName}
                </th>
                <td width="20%">{gender}</td>
                <td width="20%">
                  {moment(birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]}
                </td>
                <td width="20%" className="table-alignment">
                  <img
                    src={`${flagsURL}${countryFound.iso}`}
                    alt=""
                    width="30px"
                    style={{ marginRight: "10px" }}
                  />
                  {country}
                </td>
                <td width="10%">
                  <button
                    className="btn-del-usr"
                    onClick={() => handleDeleteUser(userItem)}
                  >
                    <i
                      className={`${
                        nickName !== "admin" ? "bi bi-person-dash-fill" : ""
                      }`}
                    ></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  return (
    <>
      {loading === false ? (
        <div className="admin-container">
          <div className="ui grid container admin">
            <div id="top-index-users" className="top-index-users">
              <h1>Usuarios registrados</h1>
              <p />
              <div className="inline-coinlist">
                <input
                  id="search"
                  type="text"
                  className="search-box"
                  placeholder="Busca aquí..."
                  value={query}
                  onChange={inputQuery}
                  autoComplete="off"
                />
                <i
                  className={
                    closeVisibility === false
                      ? "close-btn-hidden-coinlist"
                      : "close-btn-visible-coinlist"
                  }
                  onClick={clearInput}
                >
                  <Close />
                </i>
              </div>
            </div>
            <br></br>
            {displayHeader()}
            {displayUsers}
            {paginate < user?.length && (
              <button type="button" className="btn btn-warn" onClick={loadMore}>
                <FaPlus />
              </button>
            )}
            <p></p>
          </div>
          <button
            type="button"
            className="btn btn-top-admin"
            onClick={scrollToTop}
          >
            <FaAngleDoubleUp />
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-back-admin">
            <FaArrowCircleLeft />
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Management;
