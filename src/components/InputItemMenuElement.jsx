import { useState } from "react";
import { useSnackbar } from "notistack";
import { updatePlat, deletePlat } from "@/services/api"; // Ensure these functions accept ID

const InputItemMenuElement = ({ item, refreshData }) => {
  const [inputValue, setInputValue] = useState(item.Nom); // Assuming item has `Nom` and `ID`
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateOrDelete = async () => {
    if (inputValue.trim() === "" && item.ID) {
      // Delete if input is empty and item had an ID
      try {
        await deletePlat(item.ID);
        enqueueSnackbar("Le plat a été supprimé", { variant: "default" });
        refreshData(); // Refresh the list to show the deletion
      } catch (error) {
        enqueueSnackbar("Erreur lors de la suppression du plat", { variant: "error" });
      }
    } else if (inputValue !== item.Nom && inputValue.trim() !== "") {
      // Update if input has changed and is not empty
      try {
        await updatePlat(item.ID, inputValue, item.Prix, item.Types); // Pass ID instead of name
        enqueueSnackbar("La modification a bien été enregistrée", { variant: "success" });
        refreshData(); // Refresh to show the update
      } catch (error) {
        enqueueSnackbar("Erreur lors de la mise à jour du plat", { variant: "error" });
      }
    }
  };

  const handleBlur = () => {
    handleUpdateOrDelete();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default InputItemMenuElement;
