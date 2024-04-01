import PropTypes from "prop-types";
import { useState } from "react";
import Accordeon from "./Accordeon";
import { useSnackbar } from "notistack";
import InputItemMenuElement from "./InputItemMenuElement";
import InputItemPriceMenuElement from "./InputItemPriceMenuElement";

const AddMenuElementBlock = ({ dataItem, getData }) => {
  const [inputNewElement, setInputNewElement] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const sendNewElement = () => {
    console.log(inputNewElement);
    // Envoie le nouvel élément rentré au serveur

    // envoyer dataItem.id pour l'id du menu et inputValue en nouvel item

    // rappeler l'api pour recharger la liste des menus
    enqueueSnackbar("L'élément a bien été ajouté", { variant: "success" });
    // enqueueSnackbar('L\'élément n\'a pas bien été ajouté', {variant:'error'})

    getData();
  };

  return (
    <div key={`menuItem-${dataItem.id}`} className="flex-1 ">
      <Accordeon
        className="max-w-[340px]"
        textcolor="black"
        title={dataItem.category}
      >
        <div className="">
          {dataItem.items.map((item) => (
            <div
              className="flex gap-4 justify-between "
              key={`menuItem-${item}`}
            >
              <InputItemMenuElement item={item} />
              <InputItemPriceMenuElement item={item} price={18} />
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <input
              data-category={dataItem.category}
              onChange={(e) => setInputNewElement(e.target.value)}
              className="flex-1 border min-w-32 px-2  rounded-sm mr-1"
              type="text"
              value={inputNewElement}
              placeholder="Ajouter un élément"
            />
            <div
              onClick={sendNewElement}
              className="border p-1 cursor-pointer text-white bg-primary rounded-sm font-medium"
            >
              OK
            </div>
          </div>
        </div>
      </Accordeon>
    </div>
  );
};

AddMenuElementBlock.propTypes = {
  dataItem: PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  getData: PropTypes.func,
};

export default AddMenuElementBlock;
