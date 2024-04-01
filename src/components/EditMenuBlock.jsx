import PropTypes from "prop-types";
import Accordeon from "./Accordeon";
import { useState, useEffect } from "react";
import { updateMenu } from "@/services/api"; // Assurez-vous d'importer correctement la fonction updateMenu depuis votre service API

const EditMenuBlock = ({ dataMenu, dataItems }) => {
  //Récupérer informations du menu
  // console.log(dataItems);

  // Récupérer informations du menu
  const [selectedEntree, setSelectedEntree] = useState([]);
  const [selectedPlat, setSelectedPlat] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState([]);
  const [selectedBoisson, setSelectedBoisson] = useState([]);
  const [nomMenu, setNomMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState(0);
  const id = dataMenu.id;

  // Mettre à jour les états des plats sélectionnés lorsque les données du menu changent
  useEffect(() => {
    setSelectedEntree(dataMenu.entrees);
    setSelectedPlat(dataMenu.plats);
    setSelectedDessert(dataMenu.desserts);
    setSelectedBoisson(dataMenu.boissons);
    setNomMenu(dataMenu.name);
    setPrixMenu(dataMenu.price);
  }, [dataMenu]);
  
  // Fonction pour gérer la sélection d'un item d'un type donné
  const handleItemClick = (item, type) => {
    const category = type.category.toLowerCase();
  
    switch (category) {
      case "entrées":
        setSelectedEntree((prev) =>
          prev.some((entry) => entry.id === item.id)
            ? prev.filter((entry) => entry.id !== item.id)
            : [...prev, item]
        );
        break;
      case "plats":
        setSelectedPlat((prev) =>
          prev.some((entry) => entry.id === item.id)
            ? prev.filter((entry) => entry.id !== item.id)
            : [...prev, item]
        );
        break;
      case "desserts":
        setSelectedDessert((prev) =>
          prev.some((entry) => entry.id === item.id)
            ? prev.filter((entry) => entry.id !== item.id)
            : [...prev, item]
        );
        break;
      case "boissons":
        setSelectedBoisson((prev) =>
          prev.some((entry) => entry.id === item.id)
            ? prev.filter((entry) => entry.id !== item.id)
            : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  const handleUpdateMenu = async () => {
    try {
      // Récupérer les IDs des plats sélectionnés
      const platIDs = [...selectedEntree, ...selectedPlat, ...selectedDessert, ...selectedBoisson].map(plat => plat.id);
    
      // Appeler la fonction d'API pour mettre à jour le menu
      const response = await updateMenu({
        id: id,
        newMenu: nomMenu,
        newPrix: prixMenu,
        plats: platIDs,
      });
  
      console.log("Menu updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };
  
  
  return (
    <>
      <div className="py-2 rounded-sm border shadow-md  w-full">
        <Accordeon defaultExpanded={false} flex={true} title={nomMenu}>
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
                    className={`cursor-pointer ${
                      selectedEntree.some((entry) => entry.id === item.id) ||
                      selectedPlat.some((entry) => entry.id === item.id) ||
                      selectedDessert.some((entry) => entry.id === item.id) ||
                      selectedBoisson.some((entry) => entry.id === item.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleItemClick(item, dataItem)}
                  >
                    {item.name}
                  </p>
                  ))}
                </Accordeon>
              </div>
            ))
          }
        </Accordeon>
        <div className="flex px-2 justify-between w-full flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              className="border px-2 py-2 text-black rounded-sm mb-2 min-w-[200px] mr-4"
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
              onClick={handleUpdateMenu} // Appeler la fonction handleUpdateMenu lors du clic sur le bouton "Modifier"
            >
              Modifier
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EditMenuBlock.propTypes = {
  dataItems: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
    })
  ),
  dataMenu: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    entrees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    plats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    desserts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    boissons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

export default EditMenuBlock;
