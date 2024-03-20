import React, { useState } from "react";
import logo from "../assets/logo.svg";
import guest from "../assets/guest.svg";
import { NavLink } from "react-router-dom";
import ConnexionMenu from "./ConnexionMenu";
import Burger from "./Burger";

const Navbar = ({ position = "absolute", linkscolor = "white" }) => {
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  // let prenom, nom, email;
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // if (userInfo) {
  //   prenom = userInfo.prenom;
  //   nom = userInfo.nom;
  //   email = userInfo.email;
  //   // Utilisez prenom, nom, et email selon vos besoins
  // }

  const [displayConnexionMenu, setDisplayConnexionMenu] = useState(false);

  return (
    <div
      className={`${position}  z-30 w-full flex justify-between items-center text-${linkscolor} my-3`}
    >
      <div className="w-1/2 flex justify-evenly opacity-0 sm:opacity-100">
        <NavLink to="/reservation" className=" font-jacqueFrancois">
          Réservation
        </NavLink>
        <NavLink to="/menu" className=" font-jacqueFrancois">
          Menu
        </NavLink>
      </div>

      <NavLink to="/">
        <img src={logo} className="w-22" alt="logo" />
      </NavLink>

      <div className="relative w-1/2 ">
        <div className=" justify-evenly  hidden sm:flex">
          <NavLink to="/contact" className=" font-jacqueFrancois">
            Contact
          </NavLink>
          <div
            className="relative"
            onClick={() =>
              displayConnexionMenu
                ? setDisplayConnexionMenu(false)
                : setDisplayConnexionMenu(true)
            }
          >
            <svg
              className={`svg-icon cursor-pointer text-${linkscolor} w-6 align-middle overflow-hidden`}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M737.236281 284.26342c0 139.840928-114.332754 253.224348-255.411942 253.224348-141.079188 0-255.370667-113.38342-255.370667-253.224348 0-139.923478 114.332754-253.306899 255.411942-253.306898 141.079188 0 255.370667 113.38342 255.370667 253.306898z m-255.411942 253.224348c235.145739 0 425.672812 142.4 425.672811 411.845565H56.192802c0-269.445565 190.527072-411.845565 425.672812-411.845565z"
              />
            </svg>

            {displayConnexionMenu && <ConnexionMenu/>}
          </div>
        </div>
        <Burger color={linkscolor == "white" ? "white" : "primary"}></Burger>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  backgroundColor: "transparent",
};

export default Navbar;
