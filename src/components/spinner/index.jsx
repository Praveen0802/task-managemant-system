import React from "react";

const Spinner = ({className}) => {
  return (
    <div className={` ${className} flex justify-center items-center h-screen`}>
      <div
        className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"
        role="status"
      >
      </div>
    </div>
  );
};

export default Spinner;
