import { useState } from "react";
import MakeRecipeBlock from "./MakeRecipeBlock";
import MenuOfTheDay from "./MenuOfTheDay";

const dataItems = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

const MakeRecipeT = () => {
  const [nomMenu, setNomMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState();

  const [selectedItems, setSelectedItems] = useState([]);

  const addSelectedItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeSelectedItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    }
  };

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
        {dataItems.map((dataItem) => {
          return (
            <MakeRecipeBlock
            key={`dataItem-MR-${dataItem.id}`}
              removeSelectedItem={removeSelectedItem}
              addSelectedItem={addSelectedItem}
              selectedItems={selectedItems}
              dataItem={dataItem}
            />
          );
        })}
      </div>

    <div className="flex justify-center">
        <button className="border mt-6 px-2 py-2 font-medium rounded-sm text-primary hover:text-white hover:bg-primary">
            Ajouter le menu à la carte
        </button>
    </div>

    </>
  );
};

export default MakeRecipeT;
