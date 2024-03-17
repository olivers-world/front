import React, { useState } from "react";
import Accordeon from "./Accordeon";

const MakeRecipe = () => {
  return (
    <>
      <div>
        <Accordeon title="Entrée">
          <div className="text-sm leading-6">
            <span className="cursor-pointer font-bold text-base text-primary">
              Trio de bruschettas
            </span>
            <br />
            <span className="cursor-pointer">Salade de chèvre chaud</span>
            <br />
            <span className="cursor-pointer">Assiette de charcuterie</span>
            <br />
            <span className="cursor-pointer">Carpaccio de saumon</span>
            <br />
            <span className="cursor-pointer">Soupe à l'oignon gratinée</span>
            <br />
          </div>
        </Accordeon>
        <Accordeon title="Plat"></Accordeon>
        <Accordeon title="Dessert"></Accordeon>
        <Accordeon title="Boisson"></Accordeon>
      </div>
    </>
  );
};

export default MakeRecipe;
