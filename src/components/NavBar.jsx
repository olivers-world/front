import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

// Ajoutez la prop `backgroundColor` dans les paramètres de votre fonction.
function NavBar({ backgroundColor }) {
  return (
    // Utilisez la prop `backgroundColor` pour définir le style du composant.
    <div className="p-3 absolute z-20 w-full flex justify-evenly items-center text-white my-3" style={{ backgroundColor: backgroundColor }}>
      <NavLink to="/" className="text-2xl font-jacqueFrancois -translate-x-1/2">Accueil</NavLink>
      <NavLink to="/reservation" className="text-2xl font-jacqueFrancois -translate-x-1/2">Réservation</NavLink>
      <NavLink to="/"><img src={logo} alt="logo" className="-translate-x-1/2"/></NavLink> 
      <NavLink to="/menu" className="text-2xl font-jacqueFrancois -translate-x-1/2">Menu</NavLink>
      <NavLink to="/contact" className="text-2xl font-jacqueFrancois -translate-x-1/2">Contact</NavLink>
    </div>
  );
}

// Définissez une valeur par défaut pour `backgroundColor` en utilisant `defaultProps`.
NavBar.defaultProps = {
  backgroundColor: 'transparent', // Définit la couleur de fond par défaut à transparent
};

export default NavBar;
