import React from "react";

const CircleMeter = ({ value, label }) => {
  const getColor = () => {
    if (value >= 90) return "rgb(34,197,94)"; // green-500
    if (value >= 50) return "rgb(234,179,8)"; // yellow-500
    return "rgb(239,68,68)"; // red-500
  };

  const bg = `conic-gradient(${getColor()} ${value * 3.6}deg, #e5e7eb 0deg)`;

  return (
    <div className="flex flex-col items-center space-y-1">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: bg }}
      >
        <div className="w-12 h-12 rounded-full bg-white dark:bg-black flex items-center justify-center text-sm font-bold text-gray-800 dark:text-white">
          {value}%
        </div>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

const DownloadCard = ({ data }) => {
  return (
    <div className="relative bg-white dark:bg-white shadow-md rounded-lg p-4 w-full border border-gray-200 dark:border-gray-700 text-gray-900">

      {/* Top-right Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {/* PDF Icon */}
        <button title="Download PDF">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600 hover:text-red-800"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 2H8c-1.1 0-2 .9-2 2v3h2V4h11v16H8v-3H6v3c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            <path d="M13 12h-1v4h1v-1h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1zm0 1h1v1h-1v-1zM8 12H7v4h1v-1h1v1h1v-4H9v1H8v-1zm6-4H6v2h2v1h2v-1h2V8zm-2 1h-2V9h2v1z" />
          </svg>
        </button>

        {/* PowerPoint Icon */}
        <button title="Download PowerPoint">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-orange-500 hover:text-orange-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M5 3C3.89 3 3 3.89 3 5v14c0 1.1.89 2 2 2h9v-2H5V5h14v9h2V5c0-1.11-.9-2-2-2H5zm14.5 11c-2.5 0-4.5 2-4.5 4.5S17 23 19.5 23 24 21 24 18.5 22 14 19.5 14zm.5 2v3h-3c0-1.66 1.34-3 3-3z" />
          </svg>
        </button>
      </div>

      <h2 className="font-semibold text-md text-gray-800 dark:text-white truncate">
        {data.title}
      </h2>
      <p className="text-sm text-gray-500 mb-3">{data.source}</p>

      <div className="flex justify-between mb-4">
        <CircleMeter value={data.operational} label="Operational" />
        <CircleMeter value={data.quality} label="Quality" />
        <CircleMeter value={data.popularity} label="Popularity" />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>
          <span className="font-semibold">Entity:</span> {data.entity}
        </p>
        <p>
          <span className="font-semibold">Rows:</span>{" "}
          {data.rows.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Last Load:</span> {data.lastLoad}
        </p>
      </div>
    </div>
  );
};

export default DownloadCard;
