import React from "react";

export const CancelButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`inline-flex text-red-500 border-red-800 border-1 items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition-all bg-white-600 hover:bg-red-100 disabled:opacity/50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CancelButton;