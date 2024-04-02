import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { updatePlat } from "@/services/api"; // Ensure this is correctly imported

const InputItemPriceMenuElement = ({ price, item }) => {
  const [inputItemPrice, setInputItemPrice] = useState(price.toString()); // Ensure price is a string for input value
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdatePrice = async () => {
    // Only proceed if the price has actually been changed
    if (parseFloat(inputItemPrice) !== price) {
      try {
        // Assuming updatePlat API expects ID, newNom (optional), newPrix, newTypes (optional)
        await updatePlat(item.ID, null, parseFloat(inputItemPrice), null);
        enqueueSnackbar("Le prix a bien été mis à jour", { variant: "success" });
      } catch (error) {
        console.error("Failed to update price:", error);
        enqueueSnackbar("Erreur lors de la mise à jour du prix", { variant: "error" });
      }
    }
  };

  useEffect(() => {
    // Reset isTouched to false when the component receives a new price prop
    setInputItemPrice(price.toString());
  }, [price]);

  const handleBlur = () => {
    handleUpdatePrice();
  };

  const handleChange = (e) => {
    setInputItemPrice(e.target.value);
  };

  return (
    <input
      className="w-20" // Adjust width as needed
      type="number"
      step="0.01" // Allow decimal values for price
      value={inputItemPrice}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default InputItemPriceMenuElement;
