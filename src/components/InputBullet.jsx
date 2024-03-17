import React from "react";
import { useState } from "react";

const InputBullet = ({ info, trapped = false }) => {
  const [value, setValue] = useState(info);
  console.log(info);

  return (
    <input
      type="number"
      className={`px-2 ${
        trapped ? "mx-2" : ""
      } text-xl w-16 text-black bg-white rounded-md`}
      value={Number(value)}
      onChange={(e) => setValue(e.target.value)}
    ></input>
  );
};

export default InputBullet;
