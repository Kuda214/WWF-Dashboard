import React from "react";

export const Input = ({ className = '', disabled = false, ...props }) => {
  return (
    <input
      disabled={disabled}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm text-sm 
        focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 
        ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} 
        ${className}`}
      {...props}
    />
  );
};


export default Input;