import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

function NavBar({ linkscolor = "white", position = "absolute" }) {
  return (
    <div
      className={`${position} z-40 w-full flex justify-evenly items-center text-${linkscolor} my-3`}
    >
      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/" class="text-2xl font-jacqueFrancois">
          Accueil
        </NavLink>
        <NavLink to="/reservation" class="text-2xl font-jacqueFrancois">
          Réservation
        </NavLink>
      </div>

      <img src={logo} className="w-16" alt="logo" />

      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/menu" class="text-2xl font-jacqueFrancois">
          Menu
        </NavLink>
        <NavLink to="/contact" class="text-2xl font-jacqueFrancois">
          Contact
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
