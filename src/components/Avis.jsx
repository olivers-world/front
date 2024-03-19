import React from "react";
import { useState } from "react";

const AvisBlock = ({ name, content, date }) => {
  return (
    <div className="py-6 px-6 w-fit">
      <p className="italic text-center">"{content}"</p>
      <div className="flex justify-center gap-4 w-full text-sm">
        <div>{name}</div>
        <div>{date}</div>
      </div>
    </div>
  );
};

const Avis = () => {
  const [avis, setAvis] = useState([
    { name: "joseph", content: "très bon et pas cher", date: "10/03/2003" },
    { name: "joseph", content: "très bon et pas cher", date: "10/03/2003" },
    { name: "joseph", content: "très bon et pas cher", date: "10/03/2003" },
    {
      name: "joseph",
      content: "très bon et pas cher et grrr",
      date: "10/03/2003",
    },
    { name: "joseph", content: "très bon et pas cher", date: "10/03/2003" },
    { name: "joseph", content: "très bon et pas cher", date: "10/03/2003" },
  ]);

  return (
    <>
      <h1 className="font-medium text-lg">Derniers avis</h1>
      <div className="flex flex-wrap justify-center">
        {avis.map((avis, key) => {
          return (
            <AvisBlock
              name={avis.name}
              date={avis.date}
              content={avis.content}
              note={5}
            />
          );
        })}
      </div>
    </>
  );
};

export default Avis;
