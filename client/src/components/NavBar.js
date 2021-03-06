import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export const NavBar = () => {
  return (
    <div className={"nav-bar-wrapper"}>
      <nav>
          <ul id={"menu"}>
            <li>
              <Link to={"/"}>Ventas</Link>
            </li>
            <li>
              <Link to={"/reportes"}>Reportes</Link>
            </li>
            <li>
              <Link to={"/precios"}>Precios</Link>
            </li>
          </ul>
        </nav>
    </div>
  );
};
