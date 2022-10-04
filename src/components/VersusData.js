import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loader";
import "../css/versus.css";

const VersusData = ({ coin }) => {
  const [market_data, setMarket_Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [simbolo, setSimbolo] = useState("$");

  // Constantes para cargar la divisa y el símbolo
  const loadCurrency = localStorage.getItem("currencyNewVs");
  const loadSymbol = localStorage.getItem("symbolNewVs");

  // Constantes de manejo de datos
  var isPositive = [];

  // Opciones de formato de número (USD)
  const numberFormat = new Intl.NumberFormat("en-US");

  // eslint-disable-next-line
  useEffect(() => {
    setCurrency(loadCurrency);
    setSimbolo(loadSymbol);
    setMarket_Data(coin.market_data);
    setTimeout(() => setLoading(false), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin.market_data, currency, simbolo, loadCurrency, loadSymbol]);

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
            <label className="label-versus">Rango:</label>
            <br></br>
            <span className="mktdata-prop">{coin.market_cap_rank}</span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label-versus">Precio:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {numberFormat.format(coin.market_data.current_price[currency])}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label-versus">Capitalización:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo} {convertToICS(coin.market_data.market_cap[currency])}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label-versus">Volumen total:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo} {convertToICS(coin.market_data.total_volume[currency])}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label-versus">Suministro total:</label>
            <br></br>
            <span className="mktdata-prop">
              {convertToICS(coin.market_data.total_supply)}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label-versus">Suministro en circulación:</label>
            <br></br>
            <span className="mktdata-prop">
              {convertToICS(coin.market_data.circulating_supply)}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container">
            <label className="label-versus">Máximo 24h:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {coin.market_data.high_24h[currency].toLocaleString("en-US")}
            </span>
          </div>
          <div className="col-sm mktdata-container">
            <label className="label-versus">Mínimo 24h:</label>
            <br></br>
            <span className="mktdata-prop">
              {simbolo}{" "}
              {coin.market_data.low_24h[currency].toLocaleString("en-US")}
            </span>
          </div>
        </div>
        <div className="row g-3 align-items-start">
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Cambio en el precio (24h):</label>
            <br></br>
            <span className={`${isPositive[7] ? "pte-success" : "pte-danger"}`}>
              {simbolo}{" "}
              {convertToICS(
                coin.market_data.price_change_24h_in_currency[currency]
              ).toLocaleString("en-US")}
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Pte. cambio (24h):</label>
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
            <label className="label-versus">Pte. cambio (7d):</label>
            <br></br>
            <span className={`${isPositive[1] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_7d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Pte. cambio (14d):</label>
            <br></br>
            <span className={`${isPositive[2] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_14d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Pte. cambio (30d):</label>
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
            <label className="label-versus">Pte. cambio (60d):</label>
            <br></br>
            <span className={`${isPositive[4] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_60d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Pte. cambio (200d):</label>
            <br></br>
            <span className={`${isPositive[5] ? "pte-success" : "pte-danger"}`}>
              {coin.market_data.price_change_percentage_200d_in_currency[
                currency
              ].toFixed(2)}{" "}
              %
            </span>
          </div>
          <div className="col-sm mktdata-container-pte">
            <label className="label-versus">Pte. cambio (1y):</label>
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
        <div className="mktData_cont">
          <div className="title-mktdata">DATOS DE MERCADO</div>{" "}
          {displayMarket()}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default VersusData;
