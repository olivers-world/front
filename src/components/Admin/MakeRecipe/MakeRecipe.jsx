import Accordeon from "../../ui/Accordeon";
import MenuOfTheDay from "../../ui/MenuOfTheDay";
import { useState } from "react";

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

        <MenuOfTheDay
          selectedEntree={selectedEntree}
          selectedPlat={selectedPlat}
          selectedBoisson={selectedBoisson}
          selectedDessert={selectedDessert}
          prixMenu={prixMenu}
          nomMenu={nomMenu}
        ></MenuOfTheDay>

        <button className="border mt-6 mx-auto px-2 py-2 font-medium rounded-sm text-primary float-right hover:text-white hover:bg-primary">
          Ajouter le menu à la carte
        </button>
      </div>
    </>
  );
};

export default MakeRecipe;
