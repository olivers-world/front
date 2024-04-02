import PropTypes from "prop-types";
import Accordeon from "../../ui/Accordeon";
import { useState, useEffect } from "react";
import {
  updateMenu,
  deleteMenu,
  updateFormuleDuJour,
  deleteFormuleDuJour,
  createFormuleDuJour,
  getMenuIDFormuleDuJour,
} from "@/services/api";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

const EditMenuBlock = ({ dataMenu, dataItems }) => {
  const { enqueueSnackbar } = useSnackbar();
  // Récupérer informations du menu
  const [selectedEntree, setSelectedEntree] = useState([]);
  const [selectedPlat, setSelectedPlat] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState([]);
  const [selectedBoisson, setSelectedBoisson] = useState([]);
  const [nomMenu, setNomMenu] = useState("");
  const [prixMenu, setPrixMenu] = useState(0);
  const [isFormuleDuJour, setIsFormuleDuJour] = useState(false);
  const id = dataMenu.id;

  // Mettre à jour les états des plats sélectionnés lorsque les données du menu changent
  useEffect(() => {
    setSelectedEntree(dataMenu.entrees);
    setSelectedPlat(dataMenu.plats);
    setSelectedDessert(dataMenu.desserts);
    setSelectedBoisson(dataMenu.boissons);
    setNomMenu(dataMenu.name);
    setPrixMenu(dataMenu.price);

    const fetchFormuleDuJour = async () => {
      try {
        const response = await getMenuIDFormuleDuJour();
        if (response.menuID == id) {
          setIsFormuleDuJour(true);
        }
      } catch (error) {
        console.error("Error fetching formule du jour:", error);
      }
    };

    fetchFormuleDuJour();
  }, [dataMenu, id]);

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
      const platIDs = [
        ...selectedEntree,
        ...selectedPlat,
        ...selectedDessert,
        ...selectedBoisson,
      ].map((plat) => plat.id);

      // Appeler la fonction d'API pour mettre à jour le menu
      const response = await updateMenu(id, nomMenu, prixMenu, platIDs);

      console.log("Menu updated successfully:", response.data);
      enqueueSnackbar("Menu modifié!", { variant: "success" });
    } catch (error) {
      console.error("Error updating menu:", error);
      enqueueSnackbar("Erreur pendant la modification du menu", {
        variant: "error",
      });
    }
  };

  const handleDeleteMenu = async () => {
    try {
      const response = await deleteMenu(id); // Appelez la fonction deleteMenu avec l'ID du menu à supprimer
      console.log("Menu deleted successfully:", response.data);
      // Ajoutez ici toute logique supplémentaire après la suppression du menu
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleToggleFormuleDuJour = async (isChecked) => {
    try {
      if (isChecked) {
        // Vérifier si la form  ule du jour existe déjà pour aujourd'hui
        const response = await getMenuIDFormuleDuJour();
        const today = dayjs().format("YYYY-MM-DD");

        if (response.menuID == null) {
          await createFormuleDuJour(id, today);
          setIsFormuleDuJour(true);
          enqueueSnackbar("Formule du jour créée avec succès", {
            variant: "success",
          });
        } else {
          await deleteFormuleDuJour(response.menuID);
          await createFormuleDuJour(id, today);
          setIsFormuleDuJour(true);
          enqueueSnackbar("Menu ajouté à la formule du jour", {
            variant: "success",
          });
        }
      } else {
        // Si la case est décochée, supprimer le menu de la "Formule du jour"
        await deleteFormuleDuJour(id);
        setIsFormuleDuJour(false);
        enqueueSnackbar("Menu retiré de la formule du jour", {
          variant: "info",
        });
      }
    } catch (error) {
      console.error("Error toggling formule du jour:", error);
      enqueueSnackbar("Erreur lors de la mise à jour de la formule du jour", {
        variant: "error",
      });
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
              <input
                type="checkbox"
                id={`menu_${id}`}
                checked={isFormuleDuJour}
                onChange={(e) => handleToggleFormuleDuJour(e.target.checked)}
              />
              <label htmlFor={`menu_${id}`}>Formule du jour</label>
            </div>
          </div>

          <div className="flex gap-2 h-fit flex-wrap justify-between w-full md:w-fit">
            <div
              className="cursor-pointer border px-1 py-1 rounded-sm"
              onClick={handleDeleteMenu}
            >
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
