/* eslint-disable react/no-unescaped-entities */
import "react-calendar/dist/Calendar.css";

import Hero from "../components/Hero.jsx";

import img from "../images/img-1.png";
import img2 from "../images/img-2.png";
import example1 from "../images/example-1.png";
import example2 from "../images/example-2.png";
import example3 from "../images/example-3.png";
import example4 from "../images/example-4.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Home = () => {
  const haveSeenHomepage = localStorage.getItem('haveSeenHomepage');

  if (haveSeenHomepage === null || haveSeenHomepage === "false") {
    localStorage.setItem("haveSeenHomepage", "false");
  }

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to("#voile", {
      scaleY: 0,
      delay: 1.6,
      duration: 5,
      ease: "ease-in-out",
    });

    if (haveSeenHomepage === "false") {
      tl.play();
      setTimeout(() => localStorage.setItem("haveSeenHomepage", "true"), 4000);
    } else {
      gsap.set("#voile", { scaleY: 0 });
    }
  }, []);

  return (
    <div className="absolute h-[25.8rem] w-screen bg-hero-bg bg-cover after:content['d'] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-[25.8rem]">
      <Hero text={"Oliver's World"} buttonText={"Réservez"} />
      <div className="h-[25.8rem] w-screen"></div>

      <div className="relative">
        <div
          id="voile"
          className="absolute origin-bottom bg-white h-full w-full"
        ></div>
        <section
          id="hero"
          className=" py-2 flex justify-between flex-wrap mx-auto  max-w-screen-lg"
        >
          <div className=" flex-1 hidden md:block py-16 flex-col gap-8">
            <img className=" right-0 -top-4 parallax-bg" src={img} alt="" />
            <img className=" right-0 parallax-bg top-1/2" src={img2} alt="" />
          </div>
          <div className="mx-8">
            <div className="flex md:justify-end">
              <h1 className="text-4xl mb-8 font-jacqueFrancois block ">
                <span className="text-baseprimary text-7xl md:ml-16 mt-2 font-imperialScript font-medium">
                  Notre
                </span>
                <div className="ml-6 inline">Histoire</div>
              </h1>
            </div>
            <br />
            <p className="max-w-xl block text-justify font-notoSerifKr">
              Bienvenue chez Oliver's World, un lieu où la diversité culinaire
              rencontre l'excellence, offrant une expérience culinaire
              transcendant les frontières. Inspiré par mes voyages et ma passion
              pour la cuisine internationale, j'ai créé une carte qui vous
              emmène dans un voyage gustatif extraordinaire, explorant des
              traditions culinaires uniques à travers le globe. <br />
              <br />
              Chaque plat raconte une histoire authentique, fusionnant
              créativement des saveurs asiatiques à l'élégance méditerranéenne.
              Notre menu incarne la richesse de la cuisine mondiale avec un
              engagement inébranlable envers la qualité et la fraîcheur des
              ingrédients.
              <br />
              <br />
              Notre équipe de chefs talentueux, passionnés par l'art culinaire,
              travaille avec rigueur pour révéler la complexité de chaque
              cuisine explorée. Chaque bouchée célèbre la diversité culturelle,
              invitant à partager le monde à travers une expérience culinaire
              inoubliable.
              <br />
              <br />
              Chez Oliver's World, nous croyons en la magie de rassembler les
              gens autour de la table. Que vous soyez un explorateur culinaire
              chevronné ou que vous découvriez de nouveaux horizons gustatifs,
              notre restaurant est l'endroit où les frontières s'estompent,
              créant des souvenirs délicieux.
            </p>
            <br />
          </div>
        </section>

        <section id="images-section" className="my-16 mx-auto  max-w-screen-lg">
          <div className="mx-8">
            <h1 className="py-8 text-7xl text-baseprimary mb-8 ml-16 font-imperialScript">
              Happening
            </h1>
            <div className="relative flex flex-wrap gap-8 justify-evenly">
              <img className="x-parallax-bg" src={example1} alt="" />
              <img className="x-parallax-bg" src={example2} alt="" />
              <img className="x-parallax-bg" src={example3} alt="" />
              <img className="x-parallax-bg" src={example4} alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
