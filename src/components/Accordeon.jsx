import React from "react";
import { useState } from "react";

const Accordeon = ({ title, children }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <div className="relative mb-3 w-full md:w-fit">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group "
          data-collapse-target="collapse-1"
          onClick={() => setAccordionOpen(accordionOpen ? false : true)}
        >
          <span className="uppercase">{title}</span>
        </button>
      </h6>
      <div
        data-collapse="collapse-1"
        className={`${
          accordionOpen ? "h-fit" : "h-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 text-sm leading-normal text-center">{children}</div>
      </div>
    </div>
  );
};

export default Accordeon;
