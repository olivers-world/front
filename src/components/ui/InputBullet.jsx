import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const InputBullet = ({ info, onChange, trapped = false }) => {
  const [value, setValue] = useState(info);

  useEffect(() => {
    setValue(info);
  }, [info]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange && onChange(Number(newValue));
  };

  return (
    <input
      type="number"
      className={`px-2 ${trapped ? "mx-2" : ""} text-xl w-16 text-black bg-white rounded-md`}
      value={Number(value)}
      onChange={handleChange}
    ></input>
  );
};

InputBullet.propTypes = {
  info: PropTypes.any,
  trapped: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputBullet;
