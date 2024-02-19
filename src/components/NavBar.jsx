import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div class="absolute z-20 w-full flex justify-evenly items-center text-white my-3">
      <NavLink to="/" class="text-2xl font-jacqueFrancois">Accueil</NavLink>
      <NavLink to="/reservation" class="text-2xl font-jacqueFrancois">Réservation</NavLink>
      <img src={logo} alt="logo"/>

      <NavLink to="/" class="text-2xl font-jacqueFrancois">Menu</NavLink>
      <NavLink to="/" class="text-2xl font-jacqueFrancois">Contact</NavLink>
    </div>
  );
}

export default NavBar;
