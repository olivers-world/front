import { useState, useEffect } from "react";
import MakeRecipeBlock from "./MakeRecipeBlock";
import { getPlatsByTypes, createMenu } from "@/services/api.js";

const MakeRecipeT = () => {
  const [nomMenu, setNomMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState("");
  const [dataItems, setDataItems] = useState([]);
  const [platsResponse, setPlatsResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlatsByTypes();
        if (response) {
          setPlatsResponse(response);
          const platsData = response;
          const formattedData = Object.keys(platsData).map((category) => ({
            category,
            items: platsData[category].map((plat) => plat.Nom),
          }));
          setDataItems(formattedData);
        } else {
          console.error("Plats response is undefined.");
        }
      } catch (error) {
        console.error("Error fetching plats by types:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  const addSelectedItem = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeSelectedItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };

  const createMenuHandler = async () => {
    try {
      // Check if required fields are filled
      if (!nomMenu || !prixMenu) {
        console.error("Nom du menu et prix sont requis");
        return;
      }

      // Create the menu
      const platsIds = selectedItems.map((selectedItem) => {
        // Retrieve the plat ID using selected item's name
        let platId = null;
        Object.values(platsResponse).forEach((platsCategory) => {
          const plat = platsCategory.find((plat) => plat.Nom === selectedItem);
          if (plat) {
            platId = plat.ID;
          }
        });
        return platId;
      });
      await createMenu(nomMenu, prixMenu, platsIds);
      console.log("Menu créé avec succès");

      // Reset fields and selected items
      setNomMenu("");
      setPrixMenu("");
      setSelectedItems([]);
    } catch (error) {
      console.error("Error creating menu:", error);
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
              key={`dataItem-MR-${dataItem.category}`}
              removeSelectedItem={removeSelectedItem}
              addSelectedItem={addSelectedItem}
              selectedItems={selectedItems}
              dataItem={dataItem}
            />
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          className="border mt-6 px-2 py-2 font-medium rounded-sm text-primary hover:text-white hover:bg-primary"
          onClick={createMenuHandler}
        >
          Ajouter le menu à la carte
        </button>
      </div>
    </>
  );
};

export default MakeRecipeT;
