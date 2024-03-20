import React from "react";
import menuTemplate from "../images/menuTemplate.png";
import feuille from "../images/feuille.png";

const MenuLine = ({ nomPlat, prixPlat }) => {
  // MAX 9 lignes sur 1 Menu !!!

  return (
    <div className="flex justify-between mt-5 text-sm ">
      <div className="font-kaisei">- {nomPlat}</div>
      <div className="font-kaisei">{`${prixPlat}$`}</div>
    </div>
  );
};

const Menu = ({ children }) => {
  return (
    <div className="relative">
      <img src={menuTemplate} alt="" />
      <img className="absolute bottom-20 -right-20 -z-10" src={feuille}></img>

      <div className="absolute px-4 flex flex-col justify-center items-center w-full top-0 left-0 text-white">
        <div className="flex items-end justify-center   w-full h-32">
          <h1 className="text-[3.2rem] leading-none font-italiana">
            {children}
          </h1>
        </div>
        <div className="flex flex-col w-full  py-6">
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
          <MenuLine nomPlat={"Velouté de champignon"} prixPlat={12} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
