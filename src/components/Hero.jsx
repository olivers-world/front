import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Hero = ({ text, buttonText = undefined }) => {
  const button = useRef();
  const title = useRef();

  useGSAP(() => {
    gsap.from(button.current, {
      y: 100,
      duration: 1,
      delay: 0.6,
      ease: "ease-out",
    });
    gsap.from(title.current, { y: 200, duration: 1, ease: "ease-out" });
  }, []);

  return (
    <>
      <div className="h-[100px]"></div>
      <div className="z-10 my-12 sm:my-32 h-screen w-screen absolute flex flex-col items-center">
        <div className="mb-32 w-fit flex items-center flex-col translate-y-1/3">
          <div className="h-fit w-fit overflow-hidden">
            <h1
              ref={title}
              className="text-6xl px-4 sm:text-8xl text-center font-medium text-white mb-4 font-imperialScript"
            >
              {text}
            </h1>
          </div>
          {buttonText && (
            <NavLink to="/reservation">
              <div className="h-fit w-fit overflow-hidden">
                <button
                  ref={button}
                  className="bg-primary text-white px-4 py-2 rounded-sm font-jacqueFrancois text-xl"
                >
                  {buttonText}
                </button>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
