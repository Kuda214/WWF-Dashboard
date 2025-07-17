import React from "react";

const CircleMeter = ({ value, label }) => {
  const getColor = () => {
    if (value >= 90) return "rgb(34,197,94)"; // green-500
    if (value >= 50) return "rgb(234,179,8)"; // yellow-500
    return "rgb(239,68,68)"; // red-500
  };

  const bg = `conic-gradient(${getColor()} ${value * 3.6}deg, #e5e7eb 0deg)`;

  return (
    <div className="flex flex-col items-center space-y-1 text-gray-900">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: bg }}
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-sm font-bold text-gray-800">
          {value}%
        </div>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
};

const DownloadCard = ({ data }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-4 w-full border border-gray-200 text-gray-900">

      {/* Top-right Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {/* PDF Icon */}
        <button title="Download PDF">
          <img src="/assets/pdf.png"  width={28} height={28}/>
        </button>

        {/* PowerPoint Icon */}
        <button title="Download PowerPoint">
          <img src="/assets/powerPoint.png"  width={28} height={28}/>
        </button>
      </div>

      <h2 className="font-semibold text-md text-gray-800  truncate">
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
