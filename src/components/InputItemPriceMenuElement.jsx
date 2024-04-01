import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const InputItemPriceMenuElement = ({ price, item }) => {
  const [inputItemPrice, setInputItemPrice] = useState(price);
  const [isTouched, setIsTouched] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const sendModificationToServer = () => {
    enqueueSnackbar("Le prix a bien été enregistrée", {
      variant: "success",
    });
  };

  useEffect(() => {
    // Envoie au serveur lorsque l'utilisateur quitte l'input
    if (inputItemPrice !== price && !isTouched) {
      sendModificationToServer();
    }
  }, [inputItemPrice, price, isTouched]);

  const handleBlur = () => {
    setIsTouched(false); // Définir isTouched sur false lorsque l'utilisateur quitte l'input
  };

  const handleChange = (e) => {
    setInputItemPrice(e.target.value);
    setIsTouched(true); // Définir isTouched sur true lorsque l'utilisateur modifie la valeur de l'input
  };

  return (
    <>
      <input
        className="w-12"
        key={`priceInput-${item}`}
        type="number"
        value={inputItemPrice}
        onChange={handleChange} // Appeler la fonction handleChange lors de l'événement onChange
        onBlur={handleBlur}
      />
    </>
  );
};

export default InputItemPriceMenuElement;
