// src/components/Notification.jsx
import React, { useEffect, useState } from "react";

const Notification = ({ message, type = "info", onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show || !message) return null;

  const colorMap = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-600 text-black"
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${colorMap[type] || colorMap.info}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
