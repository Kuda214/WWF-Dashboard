// src/components/CustomToast.jsx
import React from "react";

const toastColors = {
  success: "border-green-500",
  error: "border-red-500",
  warning: "border-yellow-500",
  info: "border-blue-500"
};

const CustomToast = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 width-[10vw] `}>
      <div
        className={`bg-white text-black rounded-lg shadow-lg px-6 py-4 border-l-4 ${toastColors[type]} min-w-[280px] max-w-sm`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default CustomToast;
