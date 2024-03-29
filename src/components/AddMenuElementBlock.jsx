import PropTypes from "prop-types"
import { useState } from "react";
import Accordeon from "./Accordeon";
import { useSnackbar } from 'notistack';

const AddMenuElementBlock = ({ dataItem, getData }) => {
  const [inputValue, setInputValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const sendNewElement = () => {
    console.log(inputValue);
    // Envoie le nouvel élément rentré au serveur

    // envoyer dataItem.id pour l'id du menu et inputValue en nouvel item

    // rappeler l'api pour recharger la liste des menus
    enqueueSnackbar('L\'élément a bien été ajouté', {variant:'success'})
    // enqueueSnackbar('L\'élément n\'a pas bien été ajouté', {variant:'error'})

    getData();
  };

  return (
    <div key={`menuItem-${dataItem.id}`} className="flex-1 ">
      <Accordeon textcolor="black" title={dataItem.category}>

        <div className="">
          {dataItem.items.map((item) => (
            <div key={item}>{item}</div>
          ))}
          
          <div className="flex justify-center mt-4">
            <input
              data-category={dataItem.category}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border min-w-32 px-2  rounded-sm mr-1"
              type="text"
              value={inputValue}
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
    items: PropTypes.arrayOf(PropTypes.string)
  }),
  getData: PropTypes.func
}

export default AddMenuElementBlock;
