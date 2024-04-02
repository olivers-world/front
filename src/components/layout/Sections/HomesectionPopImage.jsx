import example1 from "@/images/example-1.png";
import example2 from "@/images/example-2.png";
import example3 from "@/images/example-3.png";
import example4 from "@/images/example-4.png";
import example5 from "@/images/imghori1-min.png";
import example6 from "@/images/imghori2-min.jpg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { useEffect } from "react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const HomesectionPopImage = ({ toggleImgStag }) => {
  const tlImgStag = useRef();
  const imgstag = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const positions = [
    { top: "0", left: "-10%", translateX: "0%", rotate: -5 },
    { top: "40%", left: "2%", translateX: "0%", rotate: 10 },
    { top: "-70%", left: "75%", translateX: "0%", rotate: 3 },
    { top: "50%", left: "85%", translateX: "0%", rotate: -7 },
    { top: "-100%", left: "5%", translateX: "50%", rotate: 10 },
    { top: "100%", left: "20%", translateX: "50%", rotate: -5 },
  ];

  useGSAP(() => {
    tlImgStag.current = gsap.timeline({ paused: true });

    for (let i = 0; i < imgstag.length; i++) {
      tlImgStag.current.to(
        imgstag[i].current,
        {
          scale: 1,
          translateX: positions[i].translateX,
          y: positions[i].top,
          left: positions[i].left,
          ease: "power3.out",
          rotate: positions[i].rotate,
          force3D: true, // Ajout de la propriété force3D
          delay: 0.1 * i * 0.3,
        },
        "<"
      );
    }
  }, []);

  useEffect(() => {
    toggleImgStag ? tlImgStag.current.play() : tlImgStag.current.reverse();
  }, [toggleImgStag]);

  return (
    <section>
      <div className="h-[100vh]">
        <div className="h-full mx-auto max-w-screen-lg">
          <div className="h-full relative flex justify-center items-center">
            <h2 className="z-30 pr-5 bg-white text-black font-imperialScript text-6xl sm:text-8xl">
              Notre excellence
            </h2>

            {/*  */}
            <img
              ref={imgstag[0]}
              className="imgstag z-10 absolute scale-0"
              src={example1}
              alt=""
            />
            <img
              ref={imgstag[1]}
              className="imgstag z-10 absolute scale-0"
              src={example2}
              alt=""
            />
            <img
              ref={imgstag[2]}
              className="imgstag z-10 absolute scale-0"
              src={example3}
              alt=""
            />
            <img
              ref={imgstag[3]}
              className="imgstag z-10 absolute scale-0"
              src={example4}
              alt=""
            />
            <img
              ref={imgstag[4]}
              className="imgstag z-10 w-96 rounded-md absolute scale-0"
              src={example5}
              alt=""
            />
            <img
              ref={imgstag[5]}
              className="imgstag z-10 w-96 rounded-md absolute scale-0"
              src={example6}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomesectionPopImage;
