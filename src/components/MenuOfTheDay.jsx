import feuille from "../images/feuille.png";

const MenuOfTheDay = ({
  displayFeuille = true,
  selectedEntree,
  selectedPlat,
  selectedDessert,
  selectedBoisson,
  prixMenu,
  nomMenu,
  className,
}) => {
  return (
    <>
      <div className={`text-center w-full`}>
        <h1 className="mx-auto mb-6 font-jacqueFrancois  w-fit text-4xl font-medium">
          {nomMenu}
        </h1>
        {selectedEntree && <p className="py-2">{selectedEntree}</p>}
        {selectedPlat && <p className="py-2">{selectedPlat}</p>}
        {selectedDessert.length > 0 && (
          <p className="py-2">
            {selectedDessert.map((dessert, index) => (
              <span key={index}>
                {dessert}
                {index + 1 !== selectedDessert.length ? "," : ""}
              </span>
            ))}
          </p>
        )}
        {selectedBoisson.length > 0 && (
          <p className="py-2">
            {selectedBoisson.map((boisson, index) => (
              <span
                key={index}
                className={selectedBoisson.length > 3 ? "text-sm" : ""}
              >
                {boisson}
                {index + 1 !== selectedBoisson.length ? "," : ""}
              </span>
            ))}
          </p>
        )}
        {prixMenu && <p className="font-medium text-4xl mt-8">{prixMenu} €</p>}
      </div>
    </>
  );
};

export default MenuOfTheDay;
