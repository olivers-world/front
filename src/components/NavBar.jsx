import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import ConnexionMenu from "./ConnexionMenu";
import Burger from "./Burger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Navbar = ({ position, linkscolor }) => {
  const [displayConnexionMenu, setDisplayConnexionMenu] = useState(false);
  const [hasAlreadySeenHomePage, setHasAlreadySeenHomePage] = useState(false);

  const router = useLocation();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.add("start");

    tl.from(
      ".logo",
      {
        y: -200,
        duration: 1,
        delay: 0.6,
        ease: "ease-out",
      },
      "start"
    );
    tl.from(
      ".leftnavelt",
      {
        y: -200,
        duration: 1,
        delay: 0.6,
        ease: "ease-out",
        stagger: -0.2,
      },
      "start"
    );
    tl.from(
      ".rightnavelt",
      {
        y: -200,
        duration: 1,
        delay: 0.6,
        ease: "ease-out",
        stagger: 0.2,
      },
      "start"
    );

    if (router.pathname === "/" && !hasAlreadySeenHomePage) {
      tl.play();
      setTimeout(() => setHasAlreadySeenHomePage(true), 2000);
    } else {
      gsap.set(".logo", { y: 0 });
      gsap.set(".leftnavelt", { y: 0 });
      gsap.set(".rightnavelt", { y: 0 });
    }
  }, []);

  return (
    <div
      className={`${position}  z-30 w-full flex justify-between items-center text-${linkscolor} my-3`}
    >
      <div className="w-1/2 flex justify-evenly opacity-0 sm:opacity-100">
        <NavLink to="/reservation" className="leftnavelt font-medium">
          Réservation
        </NavLink>
        <NavLink to="/menu" className="leftnavelt font-medium">
          Menu
        </NavLink>
      </div>

      <NavLink to="/" className="logo">
        <img src={logo} className="w-22 " alt="logo" />
      </NavLink>

      <div className="relative w-1/2 ">
        <div className=" justify-evenly  hidden sm:flex">
          <NavLink to="/contact" className="rightnavelt font-medium">
            Contact
          </NavLink>
          <div
            className="relative rightnavelt"
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

            {displayConnexionMenu && <ConnexionMenu />}
          </div>
        </div>
        <Burger color={linkscolor == "white" ? "white" : "primary"}></Burger>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  position: "absolute",
  linkscolor: "white",
};

Navbar.propTypes = {
  position: PropTypes.string,
  linkscolor: PropTypes.string,
};

export default Navbar;
