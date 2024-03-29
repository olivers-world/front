import PropTypes from "prop-types"

const InfoBullet = ({ info, trapped = false }) => {
  return (
    <span
      className={`px-2  ${
        trapped ? "mx-2" : ""
      } text-xl text-black bg-white rounded-md`}
    >
      {info}
    </span>
  );
};

InfoBullet.propTypes = {
  info: PropTypes.any,
  trapped: PropTypes.bool
}

export default InfoBullet;
