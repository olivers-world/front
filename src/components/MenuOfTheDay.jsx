import feuille from "../images/feuille.png";

const MenuOfTheDay = ({
  displayFeuille = true,
  selectedEntree,
  selectedPlat,
  selectedDessert,
  selectedBoisson,
  prixMenu,
  nomMenu,
}) => {
  return (
    <>
      <div className="text-center w-full">
        <h1 className="mx-auto mb-6 font-jacqueFrancois  w-fit text-4xl font-medium">
          {nomMenu}
        </h1>
        <p className="py-2">{selectedEntree}</p>
        <p className="py-2">{selectedPlat}</p>
        <p className="py-2">
          {selectedDessert.map((dessert, index) => {
            return (
              <>
                <span>
                  {dessert} {index + 1 !== selectedDessert.length ? "," : ""}
                </span>{" "}
              </>
            );
          })}
        </p>
        <p className="py-2">
          {selectedBoisson.map((boisson, index) => {
            return (
              <>
                <span
                  className={` ${selectedBoisson.length > 3 ? "text-sm" : ""}`}
                >
                  {boisson} {index + 1 !== selectedBoisson.length ? "," : ""}
                </span>{" "}
              </>
            );
          })}
        </p>

        <p className="font-medium  text-4xl mt-8">
          {prixMenu} {prixMenu ? " $" : ""}
        </p>
        <img
          className={`mx-auto scale-75 md:hidden ${
            displayFeuille ? "block" : "hidden"
          }`}
          src={feuille}
          alt=""
        />
      </div>
    </>
  );
};

export default MenuOfTheDay;
