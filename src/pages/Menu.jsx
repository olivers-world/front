/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Menu from "@/components/Menu.jsx";
import MenuOfTheDay from "@/components/MenuOfTheDay.jsx";
import { getPlatsByTypes } from "@/services/api.js";

const Home = () => {
  const [menus, setMenus] = useState({
    Plats: [],
    Desserts: [],
    "Entrées": [],
    Boissons: []
  });

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const data = await getPlatsByTypes();
        console.log(data);
        setMenus(data);
      } catch (error) {
        console.error('Error fetching plats:', error);
      }
    };
  
    fetchPlats();
  }, []); 

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
                <span className="text-baseprimary float-right text-7xl md:ml-16 mt-2 font-imperialScript font-medium">
                  Notre
                </span>
                <br />{" "}
                <span className="whitespace-nowrap">Formule du jour</span>
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
            {menus["Entrées"] && <Menu title="Entrées" plats={menus["Entrées"]} />}
            {menus.Plats && <Menu title="Plats" plats={menus.Plats} />}
            {menus.Desserts && <Menu title="Desserts" plats={menus.Desserts} />}
            {menus.Boissons && <Menu title="Boissons" plats={menus.Boissons} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
