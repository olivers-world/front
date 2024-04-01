import { useEffect, useState } from "react";
import AddMenuElementBlock from "./AddMenuElementBlock";
import { getPlatsByTypes } from "@/services/api"; // Ensure this is correctly implemented to fetch plats

const AddMenuElement = () => {
  const [categorizedPlats, setCategorizedPlats] = useState([]);

  // Function to fetch data from the server
  const getData = async () => {
    try {
      const plats = await getPlatsByTypes();

      // Converts the received object into the expected array format for dataItems,
      // now including the price of each item
      const dataItems = Object.entries(plats).map(([category, items]) => ({
        category,
        items, // Directly using items as received assuming it has the needed structure
      }));

      setCategorizedPlats(dataItems);
    } catch (err) {
      console.error("Error fetching plats:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-6">
      {categorizedPlats.map((dataItem, index) => (
        <AddMenuElementBlock
          key={index} // Using index as key here, consider using a more stable key if available
          dataItem={dataItem}
          getData={getData} // Passing getData as a prop for refreshing the list
        />
      ))}
    </div>
  );
};

export default AddMenuElement;
