import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="absolute z-20 w-full flex justify-evenly items-center text-white my-3">
      <NavLink to="/" className="text-2xl font-jacqueFrancois">Accueil</NavLink>
      <NavLink to="/reservation" className="text-2xl font-jacqueFrancois">Réservation</NavLink>
      
      <NavLink to="/">
        <img src={logo} alt="logo"/>
      </NavLink> 
      
      <NavLink to="/menu" className="text-2xl font-jacqueFrancois">Menu</NavLink>
      <NavLink to="/contact" className="text-2xl font-jacqueFrancois">Contact</NavLink>
    </div>
  );
}

export default NavBar;
