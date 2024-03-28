import React from "react";
import Accordeon from "./Accordeon";
import Menu from "./Menu";
import { useState, useEffect, useRef, useReducer } from "react";

const EditMenuBlock = ({ dataMenu, dataItems }) => {
  console.log(dataItems);

  //Récupérer informations du menu

  const [selectedEntree, setSelectedEntree] = useState(dataMenu.entrees);
  const [selectedPlat, setSelectedPlat] = useState(dataMenu.platsPrincipaux);
  const [selectedDessert, setSelectedDessert] = useState(dataMenu.desserts);
  const [selectedBoisson, setSelectedBoisson] = useState(dataMenu.boissons);
  const [nomMenu, setNomMenu] = useState(dataMenu.name);
  const [prixMenu, setPrixMenu] = useState(dataMenu.price);
  const id = dataMenu.id;

  // Fonction pour gérer la sélection d'un item d'un type donné
  const handleItemClick = (item, type) => {
    const category = type.category.toLowerCase();
    console.log(category);

    switch (category) {
      case "entrées":
        setSelectedEntree((prev) =>
          prev.includes(item)
            ? prev.filter((entry) => entry !== item)
            : [...prev, item]
        );

        break;
      case "plats principaux":
        setSelectedPlat((prev) =>
          prev.includes(item)
            ? prev.filter((entry) => entry !== item)
            : [...prev, item]
        );
        break;
      case "desserts":
        setSelectedDessert((prev) =>
          prev.includes(item)
            ? prev.filter((entry) => entry !== item)
            : [...prev, item]
        );
        break;
      case "boissons":
        setSelectedBoisson((prev) =>
          prev.includes(item)
            ? prev.filter((entry) => entry !== item)
            : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  const updateMenu = () => {
    // Envoyer les nouvelles informations au serveur
    console.log("Update Changes");
  };

  return (
    <>
      <div className="py-2 rounded-sm border shadow-md  w-full">
        <Accordeon flex={true} title={nomMenu}>
          {
            // Si les données sont chargées, afficher les éléments
            dataItems.map((dataItem, index) => (
              <div key={`dataItem-${index}`} className="flex-1 min-w-[180px]">
                <Accordeon
                  textcolor="black"
                  key={index}
                  title={dataItem.category}
                >
                  {dataItem.items.map((item, itemIndex) => (
                    <p
                      key={`item-${itemIndex}`}
                      className={`
                      cursor-pointer
                      ${
                        selectedEntree.includes(item) ||
                        selectedPlat.includes(item) ||
                        selectedDessert.includes(item) ||
                        selectedBoisson.includes(item)
                          ? "selected"
                          : ""
                      }
                    `}
                      onClick={() => handleItemClick(item, dataItem)}
                    >
                      {item}
                    </p>
                  ))}
                </Accordeon>
              </div>
            ))
          }
        </Accordeon>
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              className="border px-2 py-2 text-black rounded-sm mb-2 min-w-[300px] mr-4"
              placeholder="Nom du menu"
              value={nomMenu}
              onChange={(e) => setNomMenu(e.target.value)}
            />
            <input
              type="number"
              step=".1"
              className="border w-20 px-2 py-2 rounded-sm mb-2 text-black"
              placeholder="Prix"
              value={prixMenu}
              onChange={(e) => setPrixMenu(e.target.value)}
            />
            <div className="flex gap-1 items-center mb-2">
              <input type="checkbox" id={`menu_${id}`} />
              <label htmlFor={`menu_${id}`}>Mettre en formule du jour</label>
            </div>
          </div>

          <div className="flex gap-2 h-fit flex-wrap justify-between w-full md:w-fit">
            <div className="cursor-pointer border px-1 py-1 rounded-sm">
              Supprimer
            </div>
            <div
              className="cursor-pointer border px-1 py-1 rounded-sm"
              onClick={updateMenu}
            >
              Modifier
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMenuBlock;
