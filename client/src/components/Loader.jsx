import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-24 h-24 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
