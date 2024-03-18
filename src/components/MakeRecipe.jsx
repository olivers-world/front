import React, { useState } from "react";
import Accordeon from "./Accordeon";
import feuille from "../images/feuille.png";

const MakeRecipe = () => {
  const [selectedEntree, setSelectedEntree] = useState("");
  const [selectedPlat, setSelectedPlat] = useState("");
  const [selectedDessert, setSelectedDessert] = useState([]);
  const [selectedBoisson, setSelectedBoisson] = useState([]);

  const [nomMenu, setNomMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState();

  const handleClickEntree = (itemName) => {
    setSelectedEntree(itemName);
  };
  const handleClickPlat = (itemName) => {
    setSelectedPlat(itemName);
  };
  const handleClickDessert = (itemName) => {
    setSelectedDessert((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };
  const handleClickBoisson = (itemName) => {
    setSelectedBoisson((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const [entrees, setEntrees] = useState([
    "Trio de bruschettas",
    "Salade de chèvre chaud",
    "Assiette de charcuterie",
    "Carpaccio de saumon",
    "Soupe à l'oignon gratinée",
  ]);

  const [platsPrincipaux, setPlatsPrincipaux] = useState([
    "Filet mignon",
    "Poulet rôti",
    "Pâtes aux fruits de mer",
    "Ratatouille",
    "Tarte à l'agneau",
  ]);

  const [desserts, setDesserts] = useState([
    "Tiramisu",
    "Crème brûlée",
    "Fondant au chocolat",
    "Tarte aux pommes",
    "Profiteroles",
  ]);

  const [boissons, setBoissons] = useState([
    "Vin rouge",
    "Vin blanc",
    "Bières artisanales",
    "Cocktails",
    "Jus de fruits frais",
  ]);

  return (
    <>
      <input
        type="text"
        className="border px-2 py-2 rounded-sm mb-2 min-w-[300px] mr-4"
        placeholder="Nom du menu"
        value={nomMenu}
        onChange={(e) => setNomMenu(e.target.value)}
      />
      <input
        type="number"
        step=".1"
        className="border w-20 px-2 py-2 rounded-sm mb-2 "
        placeholder="Prix"
        value={prixMenu}
        onChange={(e) => setPrixMenu(e.target.value)}
      />

      <div className="flex flex-wrap">
        <Accordeon title="Entrée">
          <div className="text-sm leading-6">
            {entrees.map((entree, index) => {
              return (
                <div key={index}>
                  <span
                    className={`cursor-pointer ${
                      selectedEntree === entree
                        ? "bg-primary font-bold text-white"
                        : ""
                    } text-base `}
                    onClick={() => handleClickEntree(entree)}
                  >
                    {entree}
                  </span>
                </div>
              );
            })}
          </div>
        </Accordeon>
        <Accordeon title="Plat">
          {platsPrincipaux.map((plat, index) => {
            return (
              <div key={index}>
                <span
                  className={`cursor-pointer ${
                    selectedPlat === plat
                      ? "bg-primary font-bold text-white"
                      : ""
                  } text-base `}
                  onClick={() => handleClickPlat(plat)}
                >
                  {plat}
                </span>
              </div>
            );
          })}
        </Accordeon>
        <Accordeon title="Dessert">
          {desserts.map((dessert, index) => {
            return (
              <div key={index}>
                <span
                  className={`cursor-pointer ${
                    selectedDessert.includes(dessert)
                      ? "bg-primary font-bold text-white"
                      : ""
                  } text-base `}
                  onClick={() => handleClickDessert(dessert)}
                >
                  {dessert}
                </span>
              </div>
            );
          })}
        </Accordeon>
        <Accordeon title="Boisson">
          {boissons.map((boisson, index) => {
            return (
              <div key={index}>
                <span
                  className={`cursor-pointer ${
                    selectedBoisson.includes(boisson)
                      ? "bg-primary font-bold text-white"
                      : ""
                  } text-base`}
                  onClick={() => handleClickBoisson(boisson)}
                >
                  {boisson}
                </span>
              </div>
            );
          })}
        </Accordeon>

        <div className="my-8 text-center w-full">
          <h1 className="mx-auto font-jacqueFrancois my-8 w-fit text-4xl font-medium">
            {nomMenu}
          </h1>
          <p className="py-2">{selectedEntree}</p>
          <p className="py-2">{selectedPlat}</p>
          <p className="py-2">
            {selectedDessert.map((dessert, index) => {
              return (
                <>
                  <span>
                    {dessert} {index + 1 !== selectedDessert.length ? "," : ""}
                  </span>{" "}
                </>
              );
            })}
          </p>
          <p className="py-2">
            {selectedBoisson.map((boisson, index) => {
              return (
                <>
                  <span
                    className={` ${
                      selectedBoisson.length > 3 ? "text-sm" : ""
                    }`}
                  >
                    {boisson} {index + 1 !== selectedBoisson.length ? "," : ""}
                  </span>{" "}
                </>
              );
            })}
          </p>
          <p className="font-medium  text-4xl mt-8">
            {prixMenu} {prixMenu ? " $" : ""}
          </p>
          <img className="mx-auto scale-75" src={feuille} alt="" />
        </div>
        <button className="border mx-auto px-2 py-2 font-medium rounded-sm text-primary float-right hover:text-white hover:bg-primary">
          Ajouter le menu à la carte
        </button>
      </div>
    </>
  );
};

export default MakeRecipe;
