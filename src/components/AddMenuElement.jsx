import Accordeon from "./Accordeon";
import AddMenuElementBlock from "./AddMenuElementBlock";
import { useState } from "react";

const AddMenuElement = () => {
  const dataItems = [
    {
      category: "Entrées",
      items: [
        "Trio de bruschettas",
        "Salade de chèvre chaud",
        "Assiette de charcuterie",
        "Carpaccio de saumon",
        "Soupe à l'oignon gratinée",
      ],
    },
    {
      category: "Plats Principaux",
      items: [
        "Filet mignon",
        "Poulet rôti",
        "Pâtes aux fruits de mer",
        "Ratatouille",
        "Tarte à l'agneau",
      ],
    },
    {
      category: "Desserts",
      items: [
        "Tiramisu",
        "Crème brûlée",
        "Fondant au chocolat",
        "Tarte aux pommes",
        "Profiteroles",
      ],
    },
    {
      category: "Boissons",
      items: [
        "Vin rouge",
        "Vin blanc",
        "Bières artisanales",
        "Cocktails",
        "Jus de fruits frais",
      ],
    },
  ];

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const sendNewElement = () => {
    // Envoie le nouvel élément rentré au serveur
  };

  return (
    <div className="flex flex-wrap">
      {dataItems.map((dataItem, index) => (
        <div key={`menuItem-${index}`} className="flex-1 min-w-[180px]">
          <Accordeon textcolor="black" title={dataItem.category}>
            <AddMenuElementBlock dataItem={dataItem} />
            <div className="flex mt-4">
              <input
                data-category={dataItem.category}
                onChange={(e) => handleInputChange(e.target.value)}
                className="float-left flex-1 border  px-2  rounded-sm mr-4"
                type="text"
                value={inputValue}
                placeholder="Ajouter un élément"
              />
              <div
                onClick={sendNewElement}
                className="border p-1 text-white bg-primary rounded-sm font-medium"
              >
                OK
              </div>
            </div>
          </Accordeon>
        </div>
      ))}
    </div>
  );
};

export default AddMenuElement;
