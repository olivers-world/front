/* eslint-disable react/no-unescaped-entities */
import "react-calendar/dist/Calendar.css";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";

import img from "../images/img-1.png";
import img2 from "../images/img-2.png";
import example1 from "../images/example-1.png";
import example2 from "../images/example-2.png";
import example3 from "../images/example-3.png";
import example4 from "../images/example-4.png";

const Menu = () => {
  return (
    <div className="absolute h-screen w-screen bg-hero-bg bg-cover after:content['d'] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-screen">
      <NavBar></NavBar>
      <div className="z-10 h-screen w-screen absolute flex flex-col justify-center items-center">
        <div className="mb-32 w-fit flex items-center flex-col">
          <h1 className="text-5xl text-white mb-4">Oliver's World</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-sm">
            Réserver ici
          </button>
        </div>
      </div>
      <div className="h-screen w-screen"></div>

      <section className="min-h-screen my-16 flex justify-between flex-wrap mx-auto  max-w-screen-lg">
        <div>
          <h1 className=" text-4xl mb-8">
            <span className="text-primary ml-16">Découvrez</span>
            <br /> notre histoire
          </h1>
          <p className="max-w-xl">
            Bienvenue chez Oliver's World, un lieu où la diversité culinaire
            rencontre l'excellence, offrant une expérience culinaire
            transcendant les frontières. Inspiré par mes voyages et ma passion
            pour la cuisine internationale, j'ai créé une carte qui vous emmène
            dans un voyage gustatif extraordinaire, explorant des traditions
            culinaires uniques à travers le globe. <br />
            <br />
            Chaque plat raconte une histoire authentique, fusionnant
            créativement des saveurs asiatiques à l'élégance méditerranéenne.
            Notre menu incarne la richesse de la cuisine mondiale avec un
            engagement inébranlable envers la qualité et la fraîcheur des
            ingrédients.
            <br />
            <br />
            Notre équipe de chefs talentueux, passionnés par l'art culinaire,
            travaille avec rigueur pour révéler la complexité de chaque cuisine
            explorée. Chaque bouchée célèbre la diversité culturelle, invitant à
            partager le monde à travers une expérience culinaire inoubliable.
            <br />
            <br />
            Chez Oliver's World, nous croyons en la magie de rassembler les gens
            autour de la table. Que vous soyez un explorateur culinaire
            chevronné ou que vous découvriez de nouveaux horizons gustatifs,
            notre restaurant est l'endroit où les frontières s'estompent, créant
            des souvenirs délicieux.
            <br />
            <br /> Bienvenue dans notre univers gastronomique!
          </p>
        </div>

        <div className="py-16 flex flex-col gap-8">
          <img className="" src={img} alt="" />
          <img className="" src={img2} alt="" />
        </div>
      </section>

      <section className="my-16 mx-auto  max-w-screen-lg">
        <div className="">
          <h1 className="py-8 text-4xl text-primary mb-8 ml-16">Happening</h1>
          <div className="flex gap-8 justify-evenly">
            <img src={example1} alt="" />
            <img src={example2} alt="" />
            <img src={example3} alt="" />
            <img src={example4} alt="" />
          </div>
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
};

export default Menu;
