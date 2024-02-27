import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="absolute z-20 w-full flex justify-evenly items-center text-white my-3">
      <NavLink to="/" className="text-2xl font-jacqueFrancois -translate-x-1/2">Accueil</NavLink>
      <NavLink to="/reservation" className="text-2xl font-jacqueFrancois -translate-x-1/2">Réservation</NavLink>
      <NavLink to="/"><img src={logo} alt="logo" className="-translate-x-1/2"/></NavLink> 
      <NavLink to="/menu" className="text-2xl font-jacqueFrancois -translate-x-1/2">Menu</NavLink>
      <NavLink to="/contact" className="text-2xl font-jacqueFrancois -translate-x-1/2">Contact</NavLink>
    </div>
  );
}

export default NavBar;
