/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Menu from "@/components/ui/Menu.jsx";
import MenuOfTheDay from "@/components/ui/MenuOfTheDay.jsx";
import { getPlatsByTypes, getFormuleDuJour } from "@/services/api.js";

const Home = () => {
  const [menus, setMenus] = useState({
    Plats: [],
    Desserts: [],
    Entrées: [],
    Boissons: [],
  });

  const [formuleDuJour, setFormuleDuJour] = useState({});

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const plats = await getPlatsByTypes();
        const formule = await getFormuleDuJour();

        if (formule && formule.Plats) {
          console.log(formule);
          setMenus(plats);
          setFormuleDuJour(formule);
        } else {
          console.log("Formule du jour is undefined or has no plats");
        }
      } catch (error) {
        console.error("Error fetching plats:", error);
      }
    };

    fetchPlats();
  }, []);

  const isFormuleDuJourLoaded =
    formuleDuJour && Array.isArray(formuleDuJour.Plats);

  const menuOfTheDayData = isFormuleDuJourLoaded
    ? {
        selectedEntree: formuleDuJour.Plats.filter(
          (plat) => plat.Types === "Entrées"
        ).map((plat) => plat.Nom),
        selectedPlat: formuleDuJour.Plats.filter(
          (plat) => plat.Types === "Plats"
        ).map((plat) => plat.Nom),
        selectedDessert: formuleDuJour.Plats.filter(
          (plat) => plat.Types === "Desserts"
        ).map((plat) => plat.Nom),
        selectedBoisson: [], // Assuming there's no 'Boissons' type in formuleDuJour.Plats
        prixMenu: formuleDuJour.Prix,
        nomMenu: formuleDuJour.Menu,
      }
    : {};

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="py-6">
          <section
            id="hero"
            className=" my-16  flex justify-between flex-wrap mx-auto  max-w-screen-lg"
          >
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-x-16 mx-auto">
              <h1 className=" text-4xl mb-8 font-jacqueFrancois">
                <span className="text-baseprimary float-right text-7xl md:ml-16 mt-2 font-imperialScript font-medium">
                  Notre
                </span>
                <br />{" "}
                <span className="whitespace-nowrap">Formule du jour</span>
              </h1>
              <div className="max-w-xl px-16 flex w-full justify-center items-center text-justify font-notoSerifKr">
                {isFormuleDuJourLoaded && (
                  <MenuOfTheDay
                    displayFeuille={false}
                    selectedEntree={menuOfTheDayData.selectedEntree}
                    selectedPlat={menuOfTheDayData.selectedPlat}
                    selectedBoisson={menuOfTheDayData.selectedBoisson}
                    selectedDessert={menuOfTheDayData.selectedDessert}
                    prixMenu={parseFloat(menuOfTheDayData.prixMenu)} // Ensure it's a number if required
                    nomMenu={menuOfTheDayData.nomMenu}
                  />
                )}
              </div>
            </div>
            <br />
          </section>
          <div className="flex flex-wrap justify-center gap-10">
            {menus["Entrées"] && (
              <Menu title="Entrées" plats={menus["Entrées"]} />
            )}
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
