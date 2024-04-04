import AddMenuElementBlock from "./AddMenuElementBlock";
import {  useEffect } from "react";

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

const AddMenuElement = () => {
  // Fonction qui récupère les données du serveur
  const getData = async () => {
    try {
      console.log("recup des données");
      
    } catch (err) {
      console.error(err);

    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-6">
      {dataItems.map((dataItem) => (
        <AddMenuElementBlock
          key={dataItem.id}
          dataItem={dataItem}
          refreshFn={getData}
        />
      ))}
    </div>
  );
};

export default AddMenuElement;
