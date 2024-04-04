import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


const Hero = ({ text, buttonText = undefined }) => {
  const button = useRef();
  const title = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(button.current, {
      y:'100%',
      duration:.5,
    }, '<').from(title.current, {
      delay:0,
      y:'120%',
      ease:'ease-in-out',
      duration:.5,

    })
  },[])

  return (
    <>
      <div className="h-[100px]"></div>
      <div className="z-10 mt-12 sm:mt-32  w-screen absolute flex flex-col items-center">
        <div className="mb-32 w-fit flex items-center flex-col translate-y-1/3">
          <div className=" h-fit w-fit overflow-hidden">
            <h1
              ref={title}
              className="text-6xl px-4 sm:text-8xl text-center font-medium text-white mb-4 font-imperialScript"
            >
              {text}
            </h1>
          </div>
          {buttonText && (
            <NavLink to="/reservation">
              <div className="w-fit h-fit overflow-hidden">
                <button
                  ref={button}
                  className="  bg-primary uppercase text-base shadow-md text-white px-4 py-2 rounded-sm font-jacqueFrancois"
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

Hero.propTypes = {
  buttonText: PropTypes.string,
  text: PropTypes.string,
};

export default Hero;
