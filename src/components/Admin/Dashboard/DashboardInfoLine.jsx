
import PropTypes from "prop-types"
const DashboardInfoLine = ({ children }) => {
  return (
    <div className="flex justify-between gap-4 uppercase px-4 py-1 bg-primary text-white font-normal">
      {children}
    </div>
  );
};

DashboardInfoLine.propTypes = {
  children: PropTypes.any
}

export default DashboardInfoLine;
