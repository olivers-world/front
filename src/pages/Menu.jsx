/* eslint-disable react/no-unescaped-entities */
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import entree from "../images/entree.png";
import plat from "../images/plat.png";
import dessert from "../images/dessert.png";
import feuille from "../images/feuille.png";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar linkscolor="black" position="block" />

        <div className="py-6">
          <div className="flex flex-wrap justify-center gap-10">
            <div className="relative">
              <img src={entree} alt="" />
              <img
                className="absolute bottom-20 -right-20 -z-10"
                src={feuille}
              ></img>
            </div>
            <div className="relative">
              <img src={plat} alt="" />
              <img
                className="absolute bottom-20 -right-20 -z-10"
                src={feuille}
              ></img>
            </div>{" "}
            <div className="relative">
              <img src={dessert} alt="" />
              <img
                className="absolute bottom-20 -right-20 -z-10"
                src={feuille}
              ></img>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
