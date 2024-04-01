import PropTypes from "prop-types";
import { useState } from "react";
import Accordeon from "./Accordeon";
import { useSnackbar } from "notistack";
import InputItemMenuElement from "./InputItemMenuElement";
import InputItemPriceMenuElement from "./InputItemPriceMenuElement";
import { createPlat } from "@/services/api"; // Ensure this function is properly implemented

const AddMenuElementBlock = ({ dataItem, getData }) => {
  const [inputNewElement, setInputNewElement] = useState("");
  const [inputNewPrice, setInputNewPrice] = useState(""); // For handling new element price
  const { enqueueSnackbar } = useSnackbar();

  const sendNewElement = async () => {
    if (!inputNewElement.trim() || !inputNewPrice.trim()) {
      enqueueSnackbar("Le nom et le prix du plat sont requis", { variant: "warning" });
      return;
    }
    try {
      await createPlat(inputNewElement, parseFloat(inputNewPrice), dataItem.category);
      enqueueSnackbar("L'élément a bien été ajouté", { variant: "success" });
      setInputNewElement(""); // Clear the input field
      setInputNewPrice(""); // Clear the price field
      getData(); // Refresh the list
    } catch (error) {
      console.error(error);
      enqueueSnackbar("L'élément n'a pas bien été ajouté", { variant: "error" });
    }
  };

  return (
    <div className="flex-1">
      <Accordeon className="max-w-[340px]" textcolor="black" title={dataItem.category}>
        <div>
          {dataItem.items.map((item, index) => (
            <div className="flex gap-4 justify-between" key={index}>
              <InputItemMenuElement item={item} refreshData={getData} />
              <InputItemPriceMenuElement item={item} price={item.Prix} refreshData={getData} />
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <input
              onChange={(e) => setInputNewElement(e.target.value)}
              className="flex-1 border min-w-32 px-2 rounded-sm mr-1"
              type="text"
              value={inputNewElement}
              placeholder="Nom du plat"
            />
            <input
              onChange={(e) => setInputNewPrice(e.target.value)}
              className="border px-2 rounded-sm w-20 mr-1"
              type="number"
              value={inputNewPrice}
              placeholder="Prix"
            />
            <button
              onClick={sendNewElement}
              className="border p-1 cursor-pointer text-white bg-primary rounded-sm font-medium"
            >
              OK
            </button>
          </div>
        </div>
      </Accordeon>
    </div>
  );
};

AddMenuElementBlock.propTypes = {
  dataItem: PropTypes.shape({
    category: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      Nom: PropTypes.string.isRequired,
      Prix: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    })).isRequired,
  }),
  getData: PropTypes.func.isRequired,
};

export default AddMenuElementBlock;
