import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { CoinList } from "../data/CoinGecko_API";
import { createTheme, ThemeProvider } from "@mui/material";
import { Close } from "@mui/icons-material";
import currencyTable from "../data/Currencies.json";
import Loading from "../components/Loader";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../css/coinList.css";

// URLs para manejo de datos en la BD
const getFavCoinURL = "https://cryptoaholic-api.vercel.app/portfolios/";

function FavCoins() {
  // Constantes de manejo de datos y paginación
  const coinsPerPage = 25;
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [coin, setCoin] = useState([]);
  // eslint-disable-next-line
  const [favCoin, setFavCoin] = useState([]);
  const [matchingCoins, setMatchingCoins] = useState([]);
  const [paginate, setPaginate] = useState(coinsPerPage);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [simbolo, setSimbolo] = useState("$");
  const [closeVisibility, setCloseVisibility] = useState(false);
  const loadUserName = sessionStorage.getItem("nickName");
  var isPositive = [];

  // Constantes de dirección del orden en la tabla
  const [directionName, setDirectionName] = useState("ASC");
  const [directionPrice, setDirectionPrice] = useState("ASC");
  const [directionCap, setDirectionCap] = useState("ASC");
  const [directionChange, setDirectionChange] = useState("ASC");
  const [directionVol, setDirectionVol] = useState("ASC");
  const [directionSupply, setDirectionSupply] = useState("ASC");

  // Constantes de iconos del orden en la tabla
  const [iconName, setIconName] = useState(faSort);
  const [iconPrice, setIconPrice] = useState(faSort);
  const [iconCap, setIconCap] = useState(faSortDown);
  const [iconChange, setIconChange] = useState(faSort);
  const [iconVol, setIconVol] = useState(faSort);
  const [iconSupply, setIconSupply] = useState(faSort);

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

  // Descargar datos a través de la API de CoinGecko
  // + Obtener monedas favoritas a travñes de la API de Cryptoaholic
  // + Buscar valores correspondientes de monedas en ambos arrays.
  const fetchCoins = async () => {
    // Variables temporales que se actualizan en el mismo render
    // (a diferencia del hook useState).
    let getCoins = [];
    let getFavCoins = [];
    // Obtener monedas de la base de datos de CoinGecko
    await axios
      .get(CoinList(currency))
      .then((response) => {
        getCoins = response.data;
        setCoin(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Obtener monedas favoritas de la base de datos de Cryptoaholic.
    await axios
      .get(getFavCoinURL + loadUserName)
      .then((response) => {
        getFavCoins = response.data;
        setFavCoin(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Buscar valores correspondientes de monedas en un array y otro.
    const matching = getCoins.filter((o1) =>
      getFavCoins.some((o2) => o1.symbol === o2.coinSymbol)
    );
    setMatchingCoins(matching);
  };

  useEffect(() => {
    fetchCoins();
    localStorage.removeItem("favedCoin");
    localStorage.removeItem("favedCoinCN");
    localStorage.setItem("currency", currency);
    localStorage.setItem("simbolo", simbolo);
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line
  }, [currency, simbolo]);

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

  // Función para cargar más monedas
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + coinsPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("top-index");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  // Ordenar por nombre
  const sortByName = () => {
    if (directionName === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortUp);
      setDirectionName("DESC");
    } else if (directionName === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
        )
      );
      setIconName(faSortDown);
      setDirectionName("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionPrice("ASC");
    setIconPrice(faSort);
    setDirectionCap("ASC");
    setIconCap(faSort);
    setDirectionChange("ASC");
    setIconChange(faSort);
    setDirectionVol("ASC");
    setIconVol(faSort);
    setDirectionSupply("ASC");
    setIconSupply(faSort);
  };

  // Ordenar por precio
  const sortByPrice = () => {
    if (directionPrice === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return a.current_price - b.current_price;
        })
      );
      setIconPrice(faSortUp);
      setDirectionPrice("DESC");
    } else if (directionPrice === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return b.current_price - a.current_price;
        })
      );
      setIconPrice(faSortDown);
      setDirectionPrice("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionCap("ASC");
    setIconCap(faSort);
    setDirectionChange("ASC");
    setIconChange(faSort);
    setDirectionVol("ASC");
    setIconVol(faSort);
    setDirectionSupply("ASC");
    setIconSupply(faSort);
  };

  // Ordenar por capitalización
  const sortByCap = () => {
    if (directionCap === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return a.market_cap - b.market_cap;
        })
      );
      setIconCap(faSortUp);
      setDirectionCap("DESC");
    } else if (directionCap === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return b.market_cap - a.market_cap;
        })
      );
      setIconCap(faSortDown);
      setDirectionCap("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionPrice("ASC");
    setIconPrice(faSort);
    setDirectionChange("ASC");
    setIconChange(faSort);
    setDirectionVol("ASC");
    setIconVol(faSort);
    setDirectionSupply("ASC");
    setIconSupply(faSort);
  };

  // Ordenar por cambio en 24h
  const sortByChange = () => {
    if (directionChange === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        })
      );
      setIconChange(faSortUp);
      setDirectionChange("DESC");
    } else if (directionChange === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        })
      );
      setIconChange(faSortDown);
      setDirectionChange("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionPrice("ASC");
    setIconPrice(faSort);
    setDirectionCap("ASC");
    setIconCap(faSort);
    setDirectionVol("ASC");
    setIconVol(faSort);
    setDirectionSupply("ASC");
    setIconSupply(faSort);
  };

  // Ordenar por volumen total
  const sortByVolume = () => {
    if (directionVol === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return a.total_volume - b.total_volume;
        })
      );
      setIconVol(faSortUp);
      setDirectionVol("DESC");
    } else if (directionVol === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return b.total_volume - a.total_volume;
        })
      );
      setIconVol(faSortDown);
      setDirectionVol("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionPrice("ASC");
    setIconPrice(faSort);
    setDirectionCap("ASC");
    setIconCap(faSort);
    setDirectionChange("ASC");
    setIconChange(faSort);
    setDirectionSupply("ASC");
    setIconSupply(faSort);
  };

  // Ordenar por suminstro
  const sortBySupply = () => {
    if (directionSupply === "ASC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return a.circulating_supply - b.circulating_supply;
        })
      );
      setIconSupply(faSortUp);
      setDirectionSupply("DESC");
    } else if (directionSupply === "DESC") {
      setMatchingCoins(
        matchingCoins.sort((a, b) => {
          return b.circulating_supply - a.circulating_supply;
        })
      );
      setIconSupply(faSortDown);
      setDirectionSupply("ASC");
    } else {
      return matchingCoins;
    }

    // Resetear los iconos y direcciones de las columnas restantes
    setDirectionName("ASC");
    setIconName(faSort);
    setDirectionPrice("ASC");
    setIconPrice(faSort);
    setDirectionCap("ASC");
    setIconCap(faSort);
    setDirectionChange("ASC");
    setIconChange(faSort);
    setDirectionVol("ASC");
    setIconVol(faSort);
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
      : Math.abs(Number(labelValue));
  }

  // Cambiar la divisa y el símbolo
  const setCurrencyNSymbol = (event) => {
    setCurrency(event.target.value);
    currencyTable.forEach((element) => {
      if (event.target.value === element.divisa) {
        setSimbolo(element.simbolo);
      }
    });
    localStorage.clear();
    localStorage.setItem("currency", currency);
    localStorage.setItem("simbolo", simbolo);
  };

  // Mostrar cabecera
  const displayHeader = () => {
    return (
      <table className="table table-striped table-dark table-bordered align-middle">
        <thead>
          <tr>
            <th onClick={sortByName} width="20%" scope="col">
              Moneda
              <FontAwesomeIcon className="sort" icon={iconName} />
            </th>
            <th
              onClick={sortByPrice}
              className="table-alignment"
              width="15%"
              scope="col"
            >
              Precio
              <FontAwesomeIcon className="sort" icon={iconPrice} />
            </th>
            <th
              onClick={sortByCap}
              className="table-alignment"
              width="20%"
              scope="col"
            >
              Capitalización
              <FontAwesomeIcon className="sort" icon={iconCap} />
            </th>
            <th
              onClick={sortByChange}
              className="table-alignment"
              width="15%"
              scope="col"
            >
              Cambio 24h
              <FontAwesomeIcon className="sort" icon={iconChange} />
            </th>
            <th
              onClick={sortByVolume}
              className="table-alignment"
              width="15%"
              scope="col"
            >
              Volumen total
              <FontAwesomeIcon className="sort" icon={iconVol} />
            </th>
            <th
              onClick={sortBySupply}
              className="table-alignment"
              width="15%"
              scope="col"
            >
              Suministro
              <FontAwesomeIcon className="sort" icon={iconSupply} />
            </th>
          </tr>
        </thead>
      </table>
    );
  };

  // Mostrar monedas
  const displayCoins = matchingCoins
    // eslint-disable-next-line
    .filter((value) => {
      if (query === "") {
        return value;
      } else if (
        value.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
        value.symbol.toLowerCase().includes(query.toLocaleLowerCase())
      ) {
        return value;
      }
    })
    .slice(0, paginate)
    .map((coin) => {
      const {
        id,
        symbol,
        name,
        image,
        current_price,
        market_cap,
        total_volume,
        price_change_percentage_24h,
        circulating_supply,
      } = coin;

      // Comprobar porcentaje negativo o positivo para aplicar CSS
      if (price_change_percentage_24h > 0) {
        let valor = true;
        isPositive.push(valor);
      } else {
        let valor = false;
        isPositive.push(valor);
      }
      return (
        <div key={id}>
          <Link className="link-deco" to={`/my-coins/${id}`}>
            <table className="table table-striped table-dark table-bordered table-hover align-middle">
              <tbody>
                <tr>
                  <th width="20%" scope="row">
                    <img src={image} alt={name} width="30px" />
                    <br></br>
                    <span width="30%">{name}</span>
                    <br></br>
                    <span className="symbol-crypto">
                      {symbol.toUpperCase()}
                    </span>
                  </th>
                  <td className="table-alignment" width="15%">
                    {simbolo} {numberFormat.format(current_price)}
                  </td>
                  <td className="table-alignment" width="20%">
                    {simbolo} {convertToICS(market_cap)}
                  </td>
                  <td
                    className={`table-alignment ${
                      isPositive.pop() ? "text-success" : "text-danger"
                    }`}
                    width="15%"
                  >
                    {price_change_percentage_24h.toFixed(2)} %
                  </td>
                  <td className="table-alignment" width="15%">
                    {simbolo} {convertToICS(total_volume)}
                  </td>
                  <td className="table-alignment" width="15%">
                    {convertToICS(circulating_supply)}
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        </div>
      );
    });

  return (
    <>
      {loading === false ? (
        <div className="coinlist-container">
          <div className="btn-currency">
            <ThemeProvider theme={darkTheme}>
              <Select
                className="select-currency"
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
          <div className="ui grid container">
            <div id="top-index" className="top-index">
              <h1>Mi seguimiento</h1>
              <p></p>
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
            {displayCoins}
            {paginate < matchingCoins?.length && (
              <button type="button" className="btn btn-warn" onClick={loadMore}>
                <FaPlus />
              </button>
            )}
            <p></p>
          </div>
          <button
            type="button"
            className="btn btn-warn-top"
            onClick={scrollToTop}
          >
            <FaAngleDoubleUp />
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default FavCoins;
