import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../data/CoinGecko_API";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import moment from "moment/moment";
import Loading from "../components/Loader";
import countryCodeISO from "../data/countryCodeISO.json";
import "../css/adminPage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

// URL para extraer las banderas de los países
const flagsURL = "https://countryflagsapi.com/svg/";

// URLs para manejo de datos en la BD
const countryStatsURL = "https://cryptoaholic-api.vercel.app/countryStats/";
const coinStatsURL = "https://cryptoaholic-api.vercel.app/coinStats/";
const usersURL = "https://cryptoaholic-api.vercel.app/users/";

function Dashboard() {
  const navigate = useNavigate();

  // Datos para gestionar la obtención y almacenamiento de las monedas.
  const currency = "usd";
  // eslint-disable-next-line
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchingCoins, setMatchingCoins] = useState([]);

  // Constante para almacenar las estadísticas
  const [countries, setCountries] = useState([]);
  // eslint-disable-next-line
  const [favCoins, setFavCoins] = useState([]);
  const [numUsers, setNumUsers] = useState([]);
  const [totalAge, setTotalAge] = useState([]);
  const [numMen, setNumMen] = useState(0);
  const [numWomen, setNumWomen] = useState(0);
  const [rango16_20, setRango16_20] = useState(0);
  const [rango21_25, setRango21_25] = useState(0);
  const [rango26_30, setRango26_30] = useState(0);
  const [rango31_35, setRango31_35] = useState(0);
  const [rango36_40, setRango36_40] = useState(0);
  const [rango41_45, setRango41_45] = useState(0);
  const [rangoMas45, setRangoMas45] = useState(0);

  // Función para extraer monedas a través de la API de CoinGecko.
  const fetchCoins = async () => {
    let getCoins = [];
    let getFavCoins = [];

    await axios
      .get(CoinList(currency))
      .then((response) => {
        getCoins = response.data;
        setCoin(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));

    await axios
      .get(coinStatsURL)
      .then((response) => {
        getFavCoins = response.data;
        setFavCoins(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Buscar valores correspondientes de monedas en un array y otro.
    const matching = getCoins.filter((o1) =>
      getFavCoins.some((o2) => o1.symbol === o2.coinSymbol)
    );
    setMatchingCoins(matching);
  };

  // Función para buscar usuarios en la BD y sus estadísticas.
  const fetchUsers = async () => {
    // Variables temporales que se actualizan en el mismo render
    // (a diferencia del hook useState).
    let getCountries = [];
    countryCodeISO.map((countryItem) => getCountries.push(countryItem));

    // Extraer todo el listado de usuarios.
    const { data } = await axios.get(usersURL);

    // Obtener el número de usuarios registrados.
    const num = data.length;
    // Obtener el número de hombres.
    const man = data.filter((elem) => elem.gender === "Hombre").length;
    // Obtener el número de mujeres.
    const woman = data.filter((elem) => elem.gender === "Mujer").length;

    // Iteración para calcular la suma total de las edades
    // (valor necesario para calcular la media de edad).
    var edadTotal = 0;
    for (let i = 0; i < data.length; i++) {
      const calcEdad = moment(data[i].birthday, "DD-MM-YYYY")
        .fromNow(true)
        .split(" ")[0];
      edadTotal += parseInt(calcEdad);
    }

    // Obtener número de usuarios por rangos de edad.
    // Rango 16-20 años.
    const r16_20 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 16 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 20
    ).length;
    // Rango 16-20 años.
    const r21_25 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 21 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 25
    ).length;
    // Rango 16-20 años.
    const r26_30 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 26 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 30
    ).length;
    // Rango 16-20 años.
    const r31_35 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 31 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 35
    ).length;
    // Rango 16-20 años.
    const r36_40 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 36 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 40
    ).length;
    // Rango 16-20 años.
    const r41_45 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 41 &&
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 45
    ).length;
    // Rango 16-20 años.
    const rMas45 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.birthday, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) > 45
    ).length;

    // Establecer los valores en los estados una vez obtenidos.
    setNumUsers(num);
    setNumMen(man);
    setNumWomen(woman);
    setTotalAge(edadTotal);
    setRango16_20(r16_20);
    setRango21_25(r21_25);
    setRango26_30(r26_30);
    setRango31_35(r31_35);
    setRango36_40(r36_40);
    setRango41_45(r41_45);
    setRangoMas45(rMas45);
  };

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get(countryStatsURL);
      setCountries(data);
    };
    fetchCoins();
    fetchStats();
    fetchUsers();
    setTimeout(() => setLoading(false), 500);
  }, []);

  const displayCountries = countries.map((elem, index) => {
    // Se busca el país cuyo nombre es el mismo que el de alguno
    // del top 3 y se almacenan todos sus datos en la variable.
    const { country } = elem;
    let flagFound = countryCodeISO.find((flag) => flag.name === country);
    return (
      <div key={elem.country}>
        {index + 1}. {elem.country}{" "}
        <img
          src={`${flagsURL}${flagFound.iso}`}
          alt=""
          width="30px"
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  });

  const displayFavCoins = matchingCoins.map((coinItem, index) => {
    const { symbol, image } = coinItem;
    // Se busca la moneda cuyo símbolo es el mismo que el de alguna
    // del top 3 y se almacenan todos sus datos en la variable.

    return (
      <div key={symbol}>
        {index + 1}. {symbol.toUpperCase()}{" "}
        <img
          src={`${image}`}
          alt=""
          width="30px"
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  });

  return (
    <>
      {loading === false ? (
        <div className="admin-container">
          <h1 className="title-dashboard">Estadísticas</h1>
          <div>
            <div className="row g-3">
              <div className="col grid-box">
                Top 3 países más registrados <br />
                <div className="numberCircleTOP3">{displayCountries}</div>
              </div>

              <div className="col grid-box">
                Top 3 monedas más seguidas <br />
                <div className="numberCircleTOP3">{displayFavCoins}</div>
              </div>

              <div className="col grid-box">
                Número de usuarios registrados <br />
                <div className="numberCircle">{numUsers}</div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col grid-box">
                Ratio hombres/mujeres (%)
                <br />
                <Pie
                  data={{
                    labels: ["Hombres", "Mujeres"],
                    datasets: [
                      {
                        label: "Ratio hombres/mujeres",
                        data: [
                          ((numMen / numUsers) * 100).toFixed(1),
                          ((numWomen / numUsers) * 100).toFixed(1),
                        ],
                        backgroundColor: [
                          "rgb(54, 162, 235)",
                          "rgb(255, 99, 132)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
              <div className="col grid-box">
                Media de edad (años)
                <br />
                <div className="numberCircleAvg">
                  {Math.trunc(totalAge / numUsers)}
                </div>
              </div>
              <div className="col grid-box">
                Usuarios por rango de edad (%)
                <br />
                <Doughnut
                  data={{
                    labels: [
                      "16-20",
                      "21-25",
                      "26-30",
                      "31-35",
                      "36-40",
                      "41-45",
                      "+45",
                    ],
                    datasets: [
                      {
                        label: "Rangos de edad",
                        data: [
                          ((rango16_20 / numUsers) * 100).toFixed(1),
                          ((rango21_25 / numUsers) * 100).toFixed(1),
                          ((rango26_30 / numUsers) * 100).toFixed(1),
                          ((rango31_35 / numUsers) * 100).toFixed(1),
                          ((rango36_40 / numUsers) * 100).toFixed(1),
                          ((rango41_45 / numUsers) * 100).toFixed(1),
                          ((rangoMas45 / numUsers) * 100).toFixed(1),
                        ],
                        backgroundColor: [
                          "rgb(54, 162, 235)",
                          "rgb(255, 99, 132)",
                          "rgb(235, 213, 52)",
                          "rgb(72, 145, 44)",
                          "rgb(26, 82, 143)",
                          "rgb(76, 26, 156)",
                          "rgb(156, 56, 26)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
          <p></p>
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

export default Dashboard;
