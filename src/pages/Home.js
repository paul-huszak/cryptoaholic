import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HomeImg from "../images/amlexa-blockchain.svg";
import "../css/home.css";

function Home() {
  function CustomLink({ to, children, ...props }) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <div className="home-container">
      <div className="container">
        <div className="row home-grid-container">
          <div className="col col-homeText">
            <h1>¡Bienvenido/a a Cryptoaholic!</h1>
            <p></p>
            <h4 className="header text-home">
              Sé el primero/a en enterarte de las <p></p>
              últimas noticias de criptomonedas
              <strong className="strong-text"> cada día</strong>.
            </h4>
            <p className="mid-line"></p>
            <h2 className="header-two">
              Cryptoaholic es una app sencilla y minimalista, <p></p>
              diseñada para facilitarte todo tipo de información <p></p>
              de forma
              <strong className="word-clara"> clara </strong>,
              <strong className="word-concisa"> concisa </strong>y
              <strong className="word-bonita"> bonita </strong>.
            </h2>
            <p></p>
            <CustomLink className="btn btn-explore" to="/coins">
              Comenzar a explorar <FaArrowRight />
            </CustomLink>
          </div>
          <div className="col col-homeImg">
            <img src={HomeImg} alt="BlockChain" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
