import PropTypes from "prop-types"
import DashboardInfoLine from "./DashboardInfoLine";

const DashboardInfo = ({ children, width = "w-fit" }) => {
  return (
    <div className={`bg-primary ${width} py-2 rounded-lg mt-2`}>
      <DashboardInfoLine>{children}</DashboardInfoLine>
    </div>
  );
};

DashboardInfo.propTypes = {
  children: PropTypes.any,
  width: PropTypes.string
}

export default DashboardInfo;
