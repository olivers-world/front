import React from "react";

const InfoBullet = ({ info, trapped = false }) => {
  return (
    <span
      className={`px-2 mt-2 ${
        trapped ? "mx-2" : ""
      } text-xl text-black bg-white rounded-md`}
    >
      {info}
    </span>
  );
};

export default InfoBullet;
