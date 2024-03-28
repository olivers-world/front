import { useRef, useEffect } from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package

gsap.registerPlugin(useGSAP);

const Sidebar = ({ expanded }) => {
  const sidebar = useRef();

  useEffect(() => {
    // Initialiser la position de la sidebar à x: 1000 dès que le composant est monté
    gsap.set(sidebar.current, { x: "200vw" });
  }, []);

  useGSAP(() => {
    if (expanded) {
      gsap.to(sidebar.current, { x: 0, duration: 1 });
    } else {
      gsap.to(sidebar.current, { x: "200vw", duration: 1 });
    }
  }, [expanded]); // <-- scope for selector text (optional)

  return (
    <div
      ref={sidebar}
      className="h-screen w-screen  text-black fixed top-0 left-0 z-40 bg-white"
    >
      <div className="my-32 flex flex-col w-full h-full text-xl">
        <div className="py-4 px-8 border-b-0 uppercase font-medium border">
          <NavLink to="/reservation">Réservation</NavLink>
        </div>
        <div className="py-4 px-8 uppercase font-medium border-b border">
          <NavLink to="/menu">Menu</NavLink>
        </div>
        <div className="py-4 px-8 uppercase font-medium border-b border">
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="py-4 px-8 uppercase font-medium border-b border">
          <NavLink to="/login">Connexion</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
