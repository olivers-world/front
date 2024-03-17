import React from "react";
import { NavLink } from "react-router-dom";

const ConnexionMenu = () => {
  return (
    <div className="absolute -bottom-4 translate-y-full left-0 z-30 w-40 border">
      <div className="  bg-white text-black">
        <div className="px-2 py-2 border-b">
          Bonjour, <span className="font-medium">Adam</span>
        </div>
        <div className="px-2 py-2 border-b ">
          <NavLink to="/admin">Admin</NavLink>
        </div>
        <div className="px-2 py-2 border-b">
          <NavLink to="/login">Connexion</NavLink>
        </div>
        <div className="px-2 py-2 ">
          <NavLink to="/register">Inscription</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ConnexionMenu;
