import PropTypes from "prop-types";
import menuTemplate from "@/images/menuTemplate.png";
import feuille from "@/images/feuille.png";

const MenuLine = ({ nomPlat, prixPlat }) => {
  // Max 9 lignes sur un menu

  return (
    <div className="flex justify-between mt-5 text-sm ">
      <div className="font-kaisei">- {nomPlat}</div>
      <div className="font-kaisei">{`${prixPlat}$`}</div>
    </div>
  );
};

MenuLine.propTypes = {
  nomPlat: PropTypes.string.isRequired,
  prixPlat: PropTypes.number.isRequired,
};

const Menu = ({ title, plats }) => {
  // Ensure that no more than 9 menu lines are rendered
  const displayedPlats = plats.slice(0, 9);

  return (
    <div className="relative">
      <img src={menuTemplate} alt="Menu template" />
      <img
        className="absolute bottom-20 -right-20 -z-10"
        src={feuille}
        alt="Decorative leaf"
      ></img>

      <div className="absolute px-4 flex flex-col justify-center items-center w-full top-0 left-0 text-white">
        <div className="flex items-end justify-center w-full h-32">
          <h1 className="text-[3.2rem] leading-none font-italiana">{title}</h1>
        </div>
        <div className="flex flex-col w-full py-6">
          {displayedPlats.map((plat, index) => {
            // console.log("plat:", plat);
            return (
              <MenuLine
                key={index}
                nomPlat={plat.Nom}
                prixPlat={parseFloat(plat.Prix)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  plats: PropTypes.arrayOf(
    PropTypes.shape({
      Nom: PropTypes.string.isRequired,
      Prix: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Menu;
