import React from "react";
import axios from "axios";
import "../css/versus.css";
import { useEffect, useState } from "react";
import { SingleCoin } from "../data/CoinGecko_API";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { createTheme, ThemeProvider } from "@mui/material";
import VersusChart from "../components/VersusChart";
import VersusData from "../components/VersusData";
import AssetTitle from "../components/AssetTitle";
import Loading from "../components/Loader";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import currencyTable from "../data/Currencies.json";
import "../css/asset.css";

function Versus() {
  // Constantes para cargar la divisa y el símbolo
  const loadCurrency = localStorage.getItem("currencyVs");
  const loadSymbol = localStorage.getItem("symbolVs");

  // Constantes para cargar la primera y segunda moneda
  const firstCoin = localStorage.getItem("idFirstQuery");
  const secondCoin = localStorage.getItem("idSecondQuery");

  const [coinL, setCoinL] = useState({});
  const [coinR, setCoinR] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(loadCurrency);
  const [simbolo, setSimbolo] = useState(loadSymbol);

  // Tema para el Navbar
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      type: "light",
    },
  });

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchFirstCoin = async () => {
      const { data } = await axios.get(SingleCoin(firstCoin));
      setCoinL(data);
    };
    const fetchSecondCoin = async () => {
      const { data } = await axios.get(SingleCoin(secondCoin));
      setCoinR(data);
    };
    fetchFirstCoin();
    fetchSecondCoin();
    localStorage.setItem("currencyNewVs", currency);
    localStorage.setItem("symbolNewVs", simbolo);
    setTimeout(() => setLoading(false), 1500);
  }, [firstCoin, secondCoin, loadCurrency, loadSymbol, currency, simbolo]);

  // Cambiar la divisa y el símbolo
  const setCurrencyNSymbol = (event) => {
    setCurrency(event.target.value);
    currencyTable.forEach((element) => {
      if (event.target.value === element.divisa) {
        setSimbolo(element.simbolo);
      }
    });
    localStorage.setItem("currencyNewVs", currency);
    localStorage.setItem("symbolNewVs", simbolo);
  };

  return (
    <>
      {loading === false ? (
        <div className="div-versus-container">
          <div className="left-coin-container">
            <div className="sidebar_left">
              <AssetTitle coin={coinL} />
              <div className="graph_container">
                <VersusChart coin={coinL} />
              </div>
              <div className="graph_container">
                <VersusData coin={coinL} />
              </div>
            </div>
          </div>
          <div className="right-coin-container">
            <div className="sidebar_right">
              <AssetTitle coin={coinR} />
              <div className="graph_container">
                <VersusChart coin={coinR} />
              </div>
              <div className="graph_container">
                <VersusData coin={coinR} />
              </div>
            </div>
          </div>
          <div className="return-container-vs">
            <Link className="btn btn-warn-back" to="/compare">
              <FaArrowCircleLeft />
            </Link>
          </div>
          <div className="btn-currency">
            <ThemeProvider theme={darkTheme}>
              <Select
                variant="outlined"
                label="Cambiar divisa"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ position: "relative", width: 140, height: 40 }}
                onChange={setCurrencyNSymbol}
              >
                {currencyTable.map(({ divisa, simbolo }) => (
                  <MenuItem key={divisa} value={divisa}>
                    {simbolo} | {divisa.toLocaleUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Versus;
