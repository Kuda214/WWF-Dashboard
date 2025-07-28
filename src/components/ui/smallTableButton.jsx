import React from "react";

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`inline-flex items-center  mt-2 justify-center rounded-2xl px-6 py-1 text-sm font-medium shadow-sm transition-all border-1 border-green-300 text-gray-700 hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;