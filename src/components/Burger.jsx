import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Burger = ({ color = "white" }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={`relative text-primary ${
          expanded ? "-rotate-90 bg-white" : ""
        } transition-all duration-1000 float-right mr-8 origin-center sm:hidden -translate-x-1/2 cursor-pointer w-fit h-fit font-medium text-xl z-50`}
        onClick={() => handleClick()}
      >
        <div className="flex flex-col gap-1">
          <div
            className={`h-[0.15em] cursor-pointer  w-8  rounded  bg-${color} ${
              expanded ? "!bg-primary" : ""
            }`}
          ></div>
          <div
            className={`h-[0.15em] cursor-pointer  w-8 rounded bg-${color} ${
              expanded ? "!bg-primary" : ""
            }`}
          ></div>
          <div
            className={`h-[0.15em] cursor-pointer  w-8 rounded bg-${color} ${
              expanded ? "!bg-primary" : ""
            }`}
          ></div>
        </div>
      </div>

      <Sidebar expanded={expanded}></Sidebar>
    </>
  );
};

export default Burger;
