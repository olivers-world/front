import { useState } from "react";
import Accordeon from "./Accordeon";

const AddMenuElementBlock = ({ dataItem, getData }) => {
  const [inputValue, setInputValue] = useState("");

  const sendNewElement = () => {
    console.log(inputValue);
    // Envoie le nouvel élément rentré au serveur

    // envoyer dataItem.id pour l'id du menu et inputValue en nouvel item

    // rappeler l'api pour recharger la liste des menus
    getData();
  };

  return (
    <div key={`menuItem-${dataItem.id}`} className="flex-1 ">
      <Accordeon textcolor="black" title={dataItem.category}>
        <div className="flex mt-4">
          {dataItem.items.map((item) => (
            <div key={item}>{item}</div>
          ))}
          <input
            data-category={dataItem.category}
            onChange={(e) => setInputValue(e.target.value)}
            className="float-left flex-1 border  px-2  rounded-sm mr-4"
            type="text"
            value={inputValue}
            placeholder="Ajouter un élément"
          />
          <div
            onClick={sendNewElement}
            className="border p-1 text-white bg-primary rounded-sm font-medium"
          >
            OK
          </div>
        </div>
      </Accordeon>
    </div>
  );
};

export default AddMenuElementBlock;
