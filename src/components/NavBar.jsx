import React from "react";
import logo from "../images/logo.png";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({
  backgroundColor,
  position = "absolute",
  linkscolor = "white",
}) => {
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
      class={`${position} z-20 w-full flex justify-between items-center text-${linkscolor} my-3`}
    >
      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/reservation" class="text-2xl font-jacqueFrancois">
          Réservation
        </NavLink>
        <NavLink to="/menu" class="text-2xl font-jacqueFrancois">
          Menu
        </NavLink>
      </div>

      <NavLink to="/">
        <img src={logo} className="w-16" alt="logo" />
      </NavLink>
      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/contact" class="text-2xl font-jacqueFrancois">
          Contact
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/login" class="text-2xl font-jacqueFrancois">
            Connexion
          </NavLink>
          <NavLink to="/register" class="text-2xl font-jacqueFrancois">
            Inscription
          </NavLink>
        </div>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  backgroundColor: "transparent",
};

export default Navbar;
