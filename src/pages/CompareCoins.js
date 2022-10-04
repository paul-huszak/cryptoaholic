import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CoinList } from "../data/CoinGecko_API";
import { createStyles, Select } from "@mantine/core";
import { cryptoList } from "../data/Coins";
import ReturnButton from "../components/BackButton";
import Swal from "sweetalert2";
import "../css/compare.css";

function CompareCoins() {
  const currency = "usd";
  const simbolo = "$";
  const [coin, setCoin] = useState([]);
  const [queryFirst, setQueryFirst] = useState("");
  const [querySecond, setQuerySecond] = useState("");

  // Estilo para los inputs de las monedas
  const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
      alignItems: "center",
      color: "#ffffff",
      fontFamily: "Poppins",
    },
    input: {
      fontFamily: "Poppins",
      width: "530px",
      height: "50px",
      borderRadius: "7px",
      paddingLeft: "15px",
      fontSize: "1rem",
      backgroundColor: "#8d4c6a",
      border: "none",
      color: theme.white,
      opacity: "85%",
      boxShadow: "#32325d40 0px 2px 5px -1px, #0000004d 0px 1px 3px -1px",
      "&:hover": {
        backgroundColor: "#622d48",
      },
      "&:focus": {
        paddingLeft: "12px",
        outline: "none",
        border: "3px solid #909090",
      },
    },
    label: {
      position: "relative",
      pointerEvents: "none",
      fontSize: theme.fontSizes.md,
      color: theme.white,
      zIndex: 1,
    },
  }));

  const { classes } = useStyles();

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(CoinList(currency));
      setCoin(data);
    };
    fetchCoins();
    localStorage.setItem("currencyVs", currency);
    localStorage.setItem("symbolVs", simbolo);
  }, []);

  // Función para gestionar la búsqueda de dos monedas
  const handleSearch = () => {
    if (queryFirst === "") {
      if (querySecond === "") {
        Swal.fire({
          title: "¡Error!",
          text: "Los campos no pueden estar vacíos.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "El campo no puede estar vacío.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else if (querySecond === "") {
      if (queryFirst === "") {
        Swal.fire({
          title: "¡Error!",
          text: "Los campos no pueden estar vacíos.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "El campo no puede estar vacío.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      // Separar el símbolo de la query mediante una exp. reg.
      // para poder buscar en la lista de monedas y así completar la petición.
      const q1_Split = queryFirst.split(/[()]/i);
      const q2_Split = querySecond.split(/[()]/i);
      coin.forEach((element) => {
        if (element.symbol.toLowerCase() === q1_Split[1].toLowerCase()) {
          localStorage.setItem("idFirstQuery", element.id);
        } else if (element.symbol.toLowerCase() === q2_Split[1].toLowerCase()) {
          localStorage.setItem("idSecondQuery", element.id);
        } else {
          // No hacer nada al respecto...
        }
      });
      Swal.fire({
        title: "¡Éxito!",
        text: "La búsqueda se ha realizado correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.replace("/compare/versus");
      }, 1500);
    }
  };

  return (
    <div className="compare-container">
      <h1>Compara dos monedas aquí</h1>
      <h2 className="body-text">
        Selecciona dos monedas para obtener información detallada<br></br>
        de ellas junto con un gráfico del historial de mercado.
      </h2>
      <br></br>
      <div className="inline">
        <Select
          label="Primera moneda"
          searchable
          nothingFound="Sin opciones"
          style={{ zIndex: 900 }}
          data={cryptoList}
          placeholder="Selecciona la primera criptomoneda"
          classNames={classes}
          clearable={true}
          onSelect={(e) => setQueryFirst(e.target.value)}
        />
        <p />
        <Select
          label="Segunda moneda"
          searchable
          nothingFound="Sin opciones"
          style={{ zIndex: 1 }}
          data={cryptoList}
          placeholder="Selecciona la segunda criptomoneda"
          classNames={classes}
          clearable={true}
          onSelect={(e) => setQuerySecond(e.target.value)}
        />
      </div>
      <br></br>
      <Link onClick={() => handleSearch()} className="btn btn-compare-go" to="">
        COMPARAR
      </Link>
      <ReturnButton />
    </div>
  );
}

export default CompareCoins;
