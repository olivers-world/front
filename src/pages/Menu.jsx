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

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar linkscolor="black" position="block" />

        <div className="py-6">
          <div className="flex flex-wrap justify-center gap-10">
            <Menu>entrées</Menu>
            <Menu>plats</Menu>
            <Menu>desserts</Menu>
            <Menu>plat du jour</Menu>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
