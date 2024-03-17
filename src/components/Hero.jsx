import React from "react";
import { NavLink } from "react-router-dom";

const Hero = ({ text, buttonText = undefined }) => {
  return (
    <div className="z-10 h-screen w-screen absolute flex flex-col justify-center items-center">
      <div className="mb-32 w-fit flex items-center flex-col translate-y-1/3">
        <h1 className="text-8xl text-center font-medium text-white mb-4 font-imperialScript">
          {text}
        </h1>
        {buttonText && (
          <NavLink to="/reservation">
            <button className="bg-primary text-white px-4 py-2 rounded-sm font-jacqueFrancois text-xl">
              {buttonText}
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Hero;
