import React from "react";

const CircleMeter = ({ value, label }) => {
  const getColor = () => {
    if (value >= 90) return "rgb(34,197,94)"; // green
    if (value >= 50) return "rgb(234,179,8)"; // yellow
    return "rgb(239,68,68)"; // red
  };

  const bg = `conic-gradient(${getColor()} ${value * 3.6}deg, #e5e7eb 0deg)`;

  return (
    <div className="flex flex-col items-center space-y-1 text-gray-900 min-w-0 flex-1">
      <div
        className="rounded-full flex items-center justify-center"
        style={{
          background: bg,
          width: "clamp(48px, 4vw, 80px)",
          height: "clamp(48px, 4vw, 80px)",
        }}
      >
        <div
          className="rounded-full bg-white flex items-center justify-center font-bold text-gray-800"
          style={{
            width: "60%",
            height: "60%",
            fontSize: "clamp(0.5rem, 0.9vw, 0.9rem)",
          }}
        >
          {value}%
        </div>
      </div>
      <span className="text-[0.55rem] sm:text-xs text-gray-500 text-center">{label}</span>
    </div>
  );
};


const DownloadCard = ({ data }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-4 w-full border border-gray-200 text-gray-900 min-w-0">

      {/* Top-right Icons */}
      <div className="absolute top-3 right-3 flex space-x-2 ">
        {[
          { src: "/assets/excel.png", title: "Download Excel" },
          { src: "/assets/pdf.png", title: "Download PDF" },
          { src: "/assets/powerPoint.png", title: "Download PowerPoint" },
        ].map((icon, idx) => (
          <button key={idx} title={icon.title} className="w-6 sm:w-7 lg:w-8">
            <img src={icon.src} alt={icon.title} className=" h-auto flex-shrink-0 p-1 w-[2vw] " />
          </button>
        ))}
      </div>

      {/* Title */}
      <h2 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 truncate">
        {data.title}
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mb-3">{data.source}</p>

      {/* Circle Meters */}
      <div className="flex justify-between gap-2 sm:gap-4 mb-4 flex-wrap">
        <CircleMeter value={data.operational} label="Operational" />
        <CircleMeter value={data.quality} label="Quality" />
        <CircleMeter value={data.popularity} label="Popularity" />
      </div>

      {/* Metadata */}
      <div className="text-[0.7rem] sm:text-xs text-gray-500 space-y-1">
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
