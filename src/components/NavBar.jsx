import React from "react";
import logo from "../images/logo.png";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ backgroundColor }) => {
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  let prenom, nom, email;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    prenom = userInfo.prenom;
    nom = userInfo.nom;
    email = userInfo.email;
    // Utilisez prenom, nom, et email selon vos besoins
  }

  return (
    <div
      className="p-3 absolute z-20 w-full flex justify-evenly items-center text-white my-3"
      style={{ backgroundColor: backgroundColor }}
    >
      <NavLink to="/" className="text-2xl font-jacqueFrancois -translate-x-1/2">
        Accueil
      </NavLink>
      <NavLink
        to="/reservation"
        className="text-2xl font-jacqueFrancois -translate-x-1/2"
      >
        Réservation
      </NavLink>

      <NavLink to="/">
        <img src={logo} alt="logo" className="-translate-x-1/2" />
      </NavLink>

      <NavLink
        to="/menu"
        className="text-2xl font-jacqueFrancois -translate-x-1/2"
      >
        Menu
      </NavLink>
      <NavLink
        to="/contact"
        className="text-2xl font-jacqueFrancois -translate-x-1/2"
      >
        Contact
      </NavLink>
      {isUserLoggedIn() && (
        <button className="absolute z-10 right-40 scale-150">
          <FontAwesomeIcon
            icon={faPerson}
          />
        </button>
      )}
    </div>
  );
};

Navbar.defaultProps = {
  backgroundColor: "transparent",
};

export default Navbar;
