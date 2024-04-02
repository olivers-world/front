import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP);

const ConnexionMenu = ({ displayConnexionMenu }) => {
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

  const tl = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to("#connexionMenu", {
      scale: 1,
      delay: 0,
      ease: "none",
      duration: 0.2,
    });
  }, []);

  useEffect(() => {
    displayConnexionMenu ? tl.current.play() : tl.current.reverse();
  }, [displayConnexionMenu]);

  return (
    <div
      id="connexionMenu"
      className="absolute scale-0 rounded-md origin-top-right -bottom-6 translate-y-full right-0 z-50 w-40 border"
    >
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
            <div className="px-2 py-2">
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
