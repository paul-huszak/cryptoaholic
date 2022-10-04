import React, { useState, useEffect } from "react";
import Loading from "../components/Loader";
import "../css/versus.css";

const AssetTitle = ({ coin }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 100);
  }, []);

  // Mostrar la cabecera de la moneda
  const displayTitle = () => {
    return (
      <div className="title-container">
        <div className="crypto-title-versus">
          <img
            className="crypto-image-versus"
            src={coin.image.large}
            alt={coin.name}
            width="50px"
          />
          | {coin.name} |
          <span className="crypto-symbol-versus">
            {coin.symbol.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading === false ? (
        <div className="title-versus">{displayTitle()}</div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AssetTitle;
