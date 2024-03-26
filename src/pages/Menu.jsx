/* eslint-disable react/no-unescaped-entities */
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Menu from "@/components/Menu.jsx";

import entree from "../images/entree.png";
import plat from "../images/plat.png";
import dessert from "../images/dessert.png";
import feuille from "../images/feuille.png";
import menuTemplate from "../images/menuTemplate.png";
import MenuOfTheDay from "@/components/MenuOfTheDay.jsx";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="py-6">
          <section
            id="hero"
            className=" my-16  flex justify-between flex-wrap mx-auto  max-w-screen-lg"
          >
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-16 mx-auto">
              <h1 className=" text-4xl mb-8 font-jacqueFrancois">
                <span className="text-baseprimary  text-7xl md:ml-16 mt-2 font-imperialScript font-medium">
                  Notre
                </span>
                <br /> Plat du jour
              </h1>
              <div className="max-w-xl px-16 flex w-full justify-center items-center text-justify font-notoSerifKr">
                <MenuOfTheDay
                  displayFeuille={false}
                  selectedEntree={"Velouté de champignons"}
                  selectedPlat={"Lasagnes au lit d épinard"}
                  selectedBoisson={["Soda", "Vin rouge", "Rosé"]}
                  selectedDessert={["Tiramisu", "Panacotta", "Cheesecake"]}
                  prixMenu={18}
                  nomMenu={"Le Doux"}
                ></MenuOfTheDay>
              </div>
            </div>
            <br />
          </section>
          <div className="flex flex-wrap justify-center gap-10">
            <Menu>entrées</Menu>
            <Menu>plats</Menu>
            <Menu>desserts</Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
