import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../data/CoinGecko_API";
import { createTheme, ThemeProvider } from "@mui/material";
import ReturnButton from "../components/BackButton";
import currencyTable from "../data/Currencies.json";
import CoinChart from "../components/Chart";
import Loading from "../components/Loader";
import Collapsible from "react-collapsible";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../css/asset.css";

// URLs para manejo de datos en la BD
const addCoinURL = "https://cryptoaholic-api.vercel.app/addCoin/";
const delCoinURL = "https://cryptoaholic-api.vercel.app/delCoin/";
const getFavCoinURL = "https://cryptoaholic-api.vercel.app/portfolios/";

function Asset() {
  // Constantes para cargar valores predeterminados
  const loadCurrency = localStorage.getItem("currency");
  const loadSymbol = localStorage.getItem("simbolo");
  const loadFav = localStorage.getItem("favedCoin");
  const loadFavCN = localStorage.getItem("favedCoinCN");
  const loadUserName = sessionStorage.getItem("nickName");
  const loadLogIn = sessionStorage.getItem("loggedIn");

  // Constantes de manejo de datos
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const [descText, setDescText] = useState("Leer descripción");
  const [description, setDescription] = useState("");
  const [market_data, setMarket_Data] = useState([]);
  const [fav, setFav] = useState(loadFav);
  const [favCN, setFavCN] = useState(loadFavCN);
  const [currency, setCurrency] = useState(loadCurrency);
  const [simbolo, setSimbolo] = useState(loadSymbol);
  var isPositive = [];

  // Opciones de formato de número (USD)
  const numberFormat = new Intl.NumberFormat("en-US");

  // Tema para el Navbar
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
      type: "light",
    },
  });

  // Cargar monedas favoritas del usuario
  const fetchFavCoins = async () => {
    const { data } = await axios.get(getFavCoinURL + loadUserName);
    // Buscar la moneda dentro de las favoritas
    let emptyFavs = data.length === 0; // Comprobar si la lista está vacía
    if (!emptyFavs) {
      // Si no lo está...
      let foundCoin = data.find((e) => e.coinSymbol === coin.symbol);
      if (foundCoin) {
        // Si la moneda existe, like puesto.
        setFav("YES");
        setFavCN("bi-star-fill");
        localStorage.removeItem("favedCoin");
        localStorage.removeItem("favedCoinCN");
        localStorage.setItem("favedCoin", "YES");
        localStorage.setItem("favedCoinCN", "bi-star-fill");
      } else {
        // Si no existe la moneda, lista para darle like.
        setFav("NO");
        setFavCN("bi-star");
        localStorage.removeItem("favedCoin");
        localStorage.removeItem("favedCoinCN");
        localStorage.setItem("favedCoin", "NO");
        localStorage.setItem("favedCoinCN", "bi-star");
      }
    } else {
      // Si lo está...
      setFav("NO");
      setFavCN("bi-star");
      localStorage.removeItem("favedCoin");
      localStorage.removeItem("favedCoinCN");
      localStorage.setItem("favedCoin", "NO");
      localStorage.setItem("favedCoinCN", "bi-star");
    }
  };

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchSingleCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
      setMarket_Data(data.market_data);
      setDescription(data.description.en);
    };
    fetchSingleCoin();
    if (loadLogIn) {
      fetchFavCoins();
    }
    localStorage.setItem("favedCoin", fav);
    localStorage.setItem("favedCoinCN", favCN);
    localStorage.setItem("currencyNew", currency);
    localStorage.setItem("simboloNew", simbolo);
    setTimeout(() => setLoading(false), 1500);
    //eslint-disable-next-line
  }, [
    id,
    loadCurrency,
    loadSymbol,
    loadUserName,
    loadFav,
    loadFavCN,
    currency,
    simbolo,
    fav,
    favCN,
  ]);

  // Función para dar o quitar Like
  const addCoin = async (coin) => {
    if (fav === "NO") {
      // Si no se ha dado like...
      localStorage.removeItem("favedCoin");
      localStorage.removeItem("favedCoinCN");
      localStorage.setItem("favedCoin", "YES");
      localStorage.setItem("favedCoinCN", "bi-star-fill");
      setFavCN("bi-star-fill");
      setFav("YES");
      await axios
        .post(addCoinURL, {
          nickName: loadUserName,
          coinSymbol: coin.symbol,
        })
        .then(() => {
          fetchFavCoins();
        })
        .catch((error) => {
          console.error("Ha habido un error!", error);
        });
    } else if (fav === "YES") {
      // Si se ha dado like...
      localStorage.removeItem("favedCoin");
      localStorage.removeItem("favedCoinCN");
      localStorage.setItem("favedCoin", "NO");
      localStorage.setItem("favedCoinCN", "bi-star");
      setFavCN("bi-star");
      setFav("NO");
      await axios
        .delete(delCoinURL + loadUserName + "/" + coin.symbol)
        .then(() => {
          fetchFavCoins();
        })
        .catch((error) => {
          console.error("Ha habido un error!", error);
        });
    } else {
      return fav;
    }
  };

  // Abrir la descripción
  const openDescription = () => {
    if (descText === "Leer descripción") {
      setDescText("Cerrar descripción");
    }
  };

  // Cerrar la descripción
  const closeDescription = () => {
    if (descText === "Cerrar descripción") {
      setDescText("Leer descripción");
    }
  };

  // Funciones para comprobar el porcentaje de cambio para aplicar CSS
  // Comprobar porcentaje de cambio en 24h
  const checkPte24h = () => {
    if (market_data.price_change_percentage_24h > 0) {
      isPositive[0] = true;
    } else {
      isPositive[0] = false;
    }
  };

  // Comprobar porcentaje de cambio en 7 días
  const checkPte7d = () => {
    if (market_data.price_change_percentage_7d > 0) {
      isPositive[1] = true;
    } else {
      isPositive[1] = false;
    }
  };

  // Comprobar porcentaje de cambio en 14 días
  const checkPte14d = () => {
    if (market_data.price_change_percentage_14d > 0) {
      isPositive[2] = true;
    } else {
      isPositive[2] = false;
    }
  };

  // Comprobar porcentaje de cambio en 30 días
  const checkPte30d = () => {
    if (market_data.price_change_percentage_30d > 0) {
      isPositive[3] = true;
    } else {
      isPositive[3] = false;
    }
  };

  // Comprobar porcentaje de cambio en 60 días
  const checkPte60d = () => {
    if (market_data.price_change_percentage_60d > 0) {
      isPositive[4] = true;
    } else {
      isPositive[4] = false;
    }
  };

  // Comprobar porcentaje de cambio en 200 días
  const checkPte200d = () => {
    if (market_data.price_change_percentage_200d > 0) {
      isPositive[5] = true;
    } else {
      isPositive[5] = false;
    }
  };

  // Comprobar porcentaje de cambio en 1 año
  const checkPte1y = () => {
    if (market_data.price_change_percentage_1y > 0) {
      isPositive[6] = true;
    } else {
      isPositive[6] = false;
    }
  };

  // Comprobar el cambio de precio en 1 día
  const checkChange24h = () => {
    if (market_data.price_change_24h > 0) {
      isPositive[7] = true;
    } else {
      isPositive[7] = false;
    }
  };

  // Cambiar la divisa y el símbolo
  const setCurrencyNSymbol = (event) => {
    setCurrency(event.target.value);
    currencyTable.forEach((element) => {
      if (event.target.value === element.divisa) {
        setSimbolo(element.simbolo);
      }
    });
    localStorage.removeItem("currencyNew");
    localStorage.removeItem("simboloNew");
    localStorage.setItem("currencyNew", currency);
    localStorage.setItem("simboloNew", simbolo);
  };

  // Mostrar la cabecera de la moneda
  const displayTitle = () => {
    return (
      <div className="title-container">
        <div className="crypto-title">
          <img
            className="crypto-image"
            src={coin.image.large}
            alt={coin.name}
            width="50px"
          />
          | {coin.name} |
          <span className="crypto-symbol">{coin.symbol.toUpperCase()}</span>
          <i
            onClick={() => addCoin(coin)}
            className={`bi ${favCN} star-icon`}
          ></i>
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
      </div>
    );
  };

  // Mostrar la descripción de la moneda
  const displayDescription = () => {
    return (
      <div className="read-more-container">
        <Collapsible
          onTriggerOpening={openDescription}
          onTriggerClosing={closeDescription}
          trigger={descText}
        >
          <div className="description-container">
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
        </Collapsible>
      </div>
    );
  };

  // Función para cambiar al SI
  function convertToICS(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? numberFormat.format((Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)) +
          " B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? numberFormat.format((Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)) +
        " M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? numberFormat.format((Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)) +
        " K"
      : // Negative value
      Number(labelValue) < 0
      ? Number(labelValue)
      : Math.abs(Number(labelValue));
  }

  // Mostrar valores de mercado de la moneda
  const displayMarket = () => {
    checkPte24h();
    checkPte7d();
    checkPte14d();
    checkPte30d();
    checkPte60d();
    checkPte200d();
    checkPte1y();
    checkChange24h();
    return (
      <div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label">Rango:</label>
            <br></br>
            <span className="mktdata-prop">{coin.market_cap_rank}</span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label">Precio:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {numberFormat.format(coin.market_data.current_price[currency])}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label">Capitalización:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo} {convertToICS(coin.market_data.market_cap[currency])}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label">Volumen total:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo} {convertToICS(coin.market_data.total_volume[currency])}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label">Suministro total:</label>
            <br></br>
            <span className="mktdata-prop">
              {convertToICS(coin.market_data.total_supply)}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label">Suministro en circulación:</label>
            <br></br>
            <span className="mktdata-prop">
              {convertToICS(coin.market_data.circulating_supply)}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label">Máximo 24h:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {coin.market_data.high_24h[currency].toLocaleString("en-US")}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label">Mínimo 24h:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {coin.market_data.low_24h[currency].toLocaleString("en-US")}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container-pte">
            <label className="label">Cambio en el precio (24h):</label>
            <br></br>
            <span className={`${isPositive[7] ? "pte-success" : "pte-danger"}`}>
              {simbolo}{" "}
              {convertToICS(
                coin.market_data.price_change_24h_in_currency[currency]
              ).toLocaleString("en-US")}
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (24h):</label>
            <br></br>
            <span className={`${isPositive[0] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_24h_in_currency[
                currency
              ].toFixed(2)}{" "}
              %{" "}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (7d):</label>
            <br></br>
            <span className={`${isPositive[1] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_7d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (14d):</label>
            <br></br>
            <span className={`${isPositive[2] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_14d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (30d):</label>
            <br></br>
            <span className={`${isPositive[3] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_30d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (60d):</label>
            <br></br>
            <span className={`${isPositive[4] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_60d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (200d):</label>
            <br></br>
            <span className={`${isPositive[5] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_200d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label">Pte. cambio (1y):</label>
            <br></br>
            <span className={`${isPositive[6] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_1y_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading === false ? (
        <div className="div-asset-container">
          <div className="asset-container">
            <div className="sidebar_l">
              <div className="title">
                {displayTitle()}
                {displayDescription()}
                {displayMarket()}
              </div>
            </div>
          </div>
          <div className="chart-container">
            <div className="sidebar_r">
              <CoinChart coin={coin} />
            </div>
          </div>
          <div className="return-container">
            <ReturnButton />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Asset;
