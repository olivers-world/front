import { useState } from "react";

const AddMenuElementBlock = ({ dataItem }) => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  return (
    <>
      {dataItem.items.map((item, itemIndex) => (
        <div className="flex gap-2" key={`item-${itemIndex}`}>
          <p>{item}</p>
          <div className="cursor-pointer justify-self-end">X</div>
        </div>
      ))}
    </>
  );
};

export default AddMenuElementBlock;
