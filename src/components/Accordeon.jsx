import React from "react";
import { useState } from "react";

const Accordeon = ({ title, children, textcolor = "black", flex = false }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <div className={`px-1 relative mb-3 flex-1  text-${textcolor}`}>
      <h6 className="mb-0">
        <button
          className="relative flex justify-evenly items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group "
          data-collapse-target="collapse-1"
          onClick={() => setAccordionOpen(accordionOpen ? false : true)}
        >
          <span className={`text-${textcolor} uppercase`}>{title}</span>
        </button>
      </h6>
      <div
        data-collapse="collapse-1"
        className={`${
          accordionOpen ? "h-fit" : "h-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div
          className={`py-4 text-sm flex-wrap leading-normal text-center ${
            flex ? "flex" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordeon;
