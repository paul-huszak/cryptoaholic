import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoinList from "./pages/CoinList";
import FavCoinList from "./pages/FavCoinList";
import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loader";
import Compare from "./pages/CompareCoins";
import Versus from "./pages/Versus";
import Management from "./pages/Management";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Protected from "./components/ProtectedRoute";
import "./css/App.css";

function App() {
  const loadIsAdmin = sessionStorage.getItem("adminLogin");
  const loadIsUser = sessionStorage.getItem("loggedIn");
  const [admin, setAdmin] = useState(loadIsAdmin);
  const [user, setUser] = useState(loadIsUser);

  useEffect(() => {
    setAdmin(loadIsAdmin);
    setUser(loadIsUser);
  }, [loadIsAdmin, loadIsUser]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cryptoaholic</title>
        <link rel="canonical" href="" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coins" element={<CoinList />} />
        <Route path="/coins/:id" element={<Asset />} />
        <Route
          path="/my-coins"
          element={
            <Protected isLoggedIn={user}>
              <FavCoinList />
            </Protected>
          }
        />
        <Route
          path="/my-coins/:id"
          element={
            <Protected isLoggedIn={user}>
              <Asset />
            </Protected>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route
          path="/profile"
          element={
            <Protected isLoggedIn={user}>
              <Profile />
            </Protected>
          }
        />
        <Route path="/compare" element={<Compare />} />
        <Route path="/compare/versus" element={<Versus />} />
        <Route
          path="/management"
          element={
            <Protected isLoggedIn={admin}>
              <Management />{" "}
            </Protected>
          }
        />
        <Route
          path="/management/user-management"
          element={
            <Protected isLoggedIn={admin}>
              <UserManagement />
            </Protected>
          }
        />
        <Route
          path="/management/dashboard"
          element={
            <Protected isLoggedIn={admin}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
