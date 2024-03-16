import React from "react";
import logo from "../images/logo.png";
import { NavLink } from "react-router-dom";

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
      className={`${position} z-20 w-full flex justify-between items-center text-${linkscolor} my-3`}
    >
      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/reservation" className=" font-jacqueFrancois">
          Réservation
        </NavLink>
        <NavLink to="/menu" className=" font-jacqueFrancois">
          Menu
        </NavLink>
      </div>

      <NavLink to="/">
        <img src={logo} className="w-16" alt="logo" />
      </NavLink>
      <div className="w-1/2 flex justify-evenly">
        <NavLink to="/contact" className=" font-jacqueFrancois">
          Contact
        </NavLink>
        <div className="flex gap-2">
          <NavLink to="/login" className=" font-jacqueFrancois">
            Connexion
          </NavLink>
          <NavLink to="/register" className=" font-jacqueFrancois">
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
