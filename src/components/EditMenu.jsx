import { useState, useEffect } from "react";
import EditMenuBlock from "./EditMenuBlock";
import { getMenu, getPlatsByTypes } from "@/services/api";

const EditMenu = () => {
  const [dataItems, setDataItems] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);

  useEffect(() => {
    const fetchMenusData = async () => {
      try {
        const menuData = await getMenu();
        const itemsData = await getPlatsByTypes();

        console.log(menuData);
        console.log(itemsData);

        const formattedMenuData = menuData.map((menu) => {
          return {
            id: menu.ID.toString(),
            price: parseFloat(menu.Prix),
            name: menu.Menu,
            entrees: menu.Plats
              .filter((plat) => plat.Types === "Entrées")
              .map((plat) => ({ id: plat.ID, name: plat.Nom })),
            plats: menu.Plats
              .filter((plat) => plat.Types === "Plats")
              .map((plat) => ({ id: plat.ID, name: plat.Nom })),
            desserts: menu.Plats
              .filter((plat) => plat.Types === "Desserts")
              .map((plat) => ({ id: plat.ID, name: plat.Nom })),
            boissons: menu.Plats
              .filter((plat) => plat.Types === "Boissons")
              .map((plat) => ({ id: plat.ID, name: plat.Nom })),
          };
        });
        // console.log(formattedMenuData);

        const formattedDataItems = Object.keys(itemsData).map((category) => {
          return {
            category: category,
            items: itemsData[category].map((plat) => ({ id: plat.ID, name: plat.Nom })),
          };
        });        
        // console.log(formattedDataItems);

        setDataItems(formattedDataItems);
        setDataMenu(formattedMenuData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données des menus :", error);
      }
    };

    fetchMenusData();
  }, []);

  return (
    <div className="flex flex-wrap gap-6  p-2">
      {dataMenu.map((menu, index) => {
        return (
          <EditMenuBlock
            key={`menu${index}`}
            dataItems={dataItems}
            dataMenu={menu}
          ></EditMenuBlock>
        );
      })}
    </div>
  );
};

export default EditMenu;
