import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const ConnexionMenu = () => {
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("Utilisateur");

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    const userRole = localStorage.getItem("roles");

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setPrenom(userInfo.prenom);
      setRole(userRole);
    }
  }, []);

  return (
    <div className="absolute -bottom-6 translate-y-full right-0 z-30 w-40 border">
      <div className="  bg-white text-black">
        {/*Utilisateur est connecter*/}
        {prenom && (
          <>
            <div className="px-2 py-2 border-b">
              Bonjour, <span className="font-medium">{prenom}</span>
            </div>
            {role === "Administrateur" && (
              <div className="px-2 py-2 border-b ">
                <NavLink to="/admin">Admin</NavLink>
              </div>
            )}
            <div className="px-2 py-2 ">
              <LogoutButton />
            </div>
          </>
        )}

        {/*Utilisateur n'est pas connecter*/}
        {prenom === "" && (
          <>
            <div className="px-2 py-2 border-b">
              <NavLink to="/login">Connexion</NavLink>
            </div>
            <div className="px-2 py-2 ">
              <NavLink to="/register">Inscription</NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnexionMenu;
