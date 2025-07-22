import React from "react";

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {children}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ asChild, children }) => {
  return children;
};

export const DialogContent = ({ className = '', children }) => {
  return <div className={className}>{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const DialogFooter = ({ children }) => {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
};

export default Dialog;