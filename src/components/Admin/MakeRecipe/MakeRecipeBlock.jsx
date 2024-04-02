import PropTypes from "prop-types";
import Accordeon from "../../ui/Accordeon";

const MakeRecipeBlock = ({
  dataItem,
  addSelectedItem,
  removeSelectedItem,
  selectedItems,
}) => {
  const toggleSelection = (item) => {
    console.log(item);
    selectedItems.includes(item)
      ? removeSelectedItem(item)
      : addSelectedItem(item);
    // si item est dans selectedItemsiD alors appelle removeSelected sinon add
  };

  return (
    <Accordeon key={`data-MR-${dataItem.id}`} title={dataItem.category}>
      {dataItem.items.map((item) => {
        return (
          <div
            key={`data-item-${item}`}
            className={`cursor-pointer ${
              selectedItems.includes(item) ? "selected" : ""
            }`}
            onClick={() => toggleSelection(item)}
          >
            {item}
          </div>
        );
      })}
    </Accordeon>
  );
};

MakeRecipeBlock.propTypes = {
  addSelectedItem: PropTypes.func,
  dataItem: PropTypes.shape({
    category: PropTypes.string,
    id: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.string),
  }),
  removeSelectedItem: PropTypes.func,
  selectedItems: PropTypes.arrayOf(PropTypes.string), // Correction du PropTypes
};

export default MakeRecipeBlock;
