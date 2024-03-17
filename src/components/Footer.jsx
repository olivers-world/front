import React from "react";
import insta from "../images/insta.svg";
import fb from "../images/fb.svg";
import tripadvisor from "../images/tripadvisor.svg";

function Footer() {
  return (
    <div className="bg-baseprimary w-screen">
      <div className="flex flex-col items-center py-8 gap-4 text-sm">
        <div className="flex gap-8">
          <img src={insta} alt="" />
          <img src={fb} alt="" />
          <img src={tripadvisor} alt="" />
        </div>
        <p className="text-white font-notoSerifKr">
          Oliver’s World restaurant © 178 avenue de la Girolle, 13015 Marseille,
          France. Tel 04.94.26.45.45 | Tous droits réservés.
        </p>
      </div>
    </div>
  );
}

export default Footer;
