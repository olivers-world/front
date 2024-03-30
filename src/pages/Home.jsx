/* eslint-disable react/no-unescaped-entities */
import "react-calendar/dist/Calendar.css";

import Hero from "../components/Hero.jsx";

import img from "../images/img-1.png";
import img2 from "../images/img-2.png";
import example1 from "../images/example-1.png";
import example2 from "../images/example-2.png";
import example3 from "../images/example-3.png";
import example4 from "../images/example-4.png";
import example5 from "../images/imghori1-min.png";
import example6 from "../images/imghori2-min.jpg";
import example7 from "../images/imghori3-min.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import { useEffect } from "react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


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

  const tlImgStag = useRef()
  const imgstag = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const [toggleImgStag, setToggleImgStag] = useState(false);

  const positions = [
    { top: '0', left: '-10%', translateX: '0%', rotate: -5},
    { top: '40%', left: '2%', translateX: '0%', rotate: 10},
    { top: '-70%', left: '75%', translateX: '0%', rotate: 3},
    { top: '50%', left: '85%', translateX: '0%', rotate:  -7},
    { top: '-100%', left: '5%', translateX: '50%', rotate: 10},
    { top: '100%', left: '20%', translateX: '50%', rotate: -5}
  ];

  useGSAP(() => {
    tlImgStag.current= gsap.timeline({paused:true})

    for (let i = 0; i < imgstag.length; i++) {
      tlImgStag.current.to(imgstag[i].current, {
        scale: 1,
        translateX: positions[i].translateX,
        y: positions[i].top,
        left: positions[i].left,
        ease: 'power3.out',
        rotate:positions[i].rotate,
        force3D: true, // Ajout de la propriété force3D
        delay:0.1*i*0.3
      }, '<');
    }

  }, [])

  useEffect(() => {
    toggleImgStag ? tlImgStag.current.play() : tlImgStag.current.reverse()
  },[toggleImgStag])

  return (
    <div className="relative">
      <div className="absolute h-[25.8rem] w-screen bg-hero-bg bg-cover after:content[''] after:bg-opacity-50 after:absolute after:top-0 after:bg-black after:w-screen after:h-[25.8rem]"></div>
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
            <p className="max-w-xl block leading-8 text-justify font-notoSerifKr">
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

        <section>
          <div className="py-64 sm:py-48">
            <div className="mx-auto max-w-screen-lg">
              <div className="h-[600px] sm:h-[500px] relative flex justify-center items-center">
                <h2 className="z-30 pr-5 bg-white text-black font-imperialScript text-6xl sm:text-8xl">Notre excellence</h2>
                
                {/*  */}
                <img ref={imgstag[0]} className="imgstag z-10 absolute scale-0" src={example1} alt="" />
                <img ref={imgstag[1]} className="imgstag z-10 absolute scale-0" src={example2} alt="" />
                <img ref={imgstag[2]} className="imgstag z-10 absolute scale-0" src={example3} alt="" />
                <img ref={imgstag[3]} className="imgstag z-10 absolute scale-0" src={example4} alt="" />
                <img ref={imgstag[4]} className="imgstag z-10 w-96 rounded-md absolute scale-0" src={example5} alt="" />
                <img ref={imgstag[5]} className="imgstag z-10 w-96 rounded-md absolute scale-0" src={example6} alt="" />

              </div>
            </div>
          </div>
          <button onClick={()=>{setToggleImgStag(!toggleImgStag), console.log(toggleImgStag)}}>DDDDDDDDDDD</button>
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
