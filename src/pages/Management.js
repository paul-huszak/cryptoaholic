import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mantine/core";
import "../css/adminPage.css";
import userIcon from "../images/user-management-icon.png";
import dashboardIcon from "../images/dashboard-icon.png";

function Management() {
  return (
    <div className="admin-container">
      <Grid justify="space-between">
        <Grid.Col span={6}>
          <Link
            to={`/management/user-management`}
            className="btn btn-primary btn-primary-admin"
          >
            <img
              src={userIcon}
              width="300px"
              height="300px"
              alt="Administrar usuarios"
            />
            <p />
            Administrar Usuarios
          </Link>
        </Grid.Col>
        <Grid.Col span={6}>
          {" "}
          <Link
            to={`/management/dashboard`}
            className="btn btn-primary btn-primary-admin"
          >
            <img
              src={dashboardIcon}
              width="300px"
              height="300px"
              alt="Mostrar estadísticas"
            />
            <p />
            Mostrar estadísticas
          </Link>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Management;
