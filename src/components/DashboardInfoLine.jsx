import React from "react";

const DashboardInfoLine = ({ children }) => {
  return (
    <div className="flex justify-between gap-4 uppercase px-4 py- bg-primary text-white font-normal">
      {children}
    </div>
  );
};

export default DashboardInfoLine;
