import React from "react";
import InfoBullet from "./InfoBullet";
import DashboardInfoLine from "./DashboardInfoLine";

const DashboardInfo = ({ children, width = "w-fit" }) => {
  return (
    <div className={`bg-primary ${width} py-2 rounded-lg mt-2`}>
      <DashboardInfoLine>{children}</DashboardInfoLine>
    </div>
  );
};

export default DashboardInfo;
