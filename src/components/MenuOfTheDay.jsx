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
      <div className={`text-center w-full ${className}`}>
        <h1 className="mx-auto mb-6 font-jacqueFrancois w-fit text-4xl font-medium">
          {nomMenu}
        </h1>
        {selectedEntree && (
          <div className="py-2">
            {selectedEntree.map((entree, index) => (
              <p key={index}>{entree}</p>
            ))}
          </div>
        )}
        {selectedPlat && (
          <div className="py-2">
            {selectedPlat.map((plat, index) => (
              <p key={index}>{plat}</p>
            ))}
          </div>
        )}
        {selectedDessert.length > 0 && (
          <div className="py-2">
            {selectedDessert.map((dessert, index) => (
              <p key={index}>{dessert}</p>
            ))}
          </div>
        )}
        {selectedBoisson.length > 0 && (
          <div className="py-2">
            {selectedBoisson.map((boisson, index) => (
              <p key={index} className={selectedBoisson.length > 3 ? "text-sm" : ""}>
                {boisson}
              </p>
            ))}
          </div>
        )}
        {prixMenu && <p className="font-medium text-4xl mt-8">{prixMenu} €</p>}
        {displayFeuille && (
          <img
            src={feuille}
            alt="Decorative leaf"
            className="absolute bottom-0 right-0"
          />
        )}
      </div>
    </>
  );
};

export default MenuOfTheDay;
