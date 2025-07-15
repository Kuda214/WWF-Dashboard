import React, { useState } from 'react';

export default function Dashboard() {
  const [category, setCategory] = useState('Oceans');
  const [visible, setVisible] = useState({
    map: true,
    calendar: true,
    projects: true,
    assigned: true,
    news: true,
  });

  const toggleVisibility = (key) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* 1. FILTER BAR */}
      <div className="w-full bg-white p-4 rounded shadow flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Filter by Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded text-gray-700"
          >
            <option>Oceans</option>
            <option>Land</option>
            <option>Wildlife</option>
            <option>Circular Economy</option>
            <option>Food</option>
            <option>Climate & Energy</option>
            <option>Water</option>
          </select>
        </div>

        {/* Checkbox filters */}
        <div className="flex flex-wrap gap-4">
          {Object.keys(visible).map((key) => (
            <label key={key} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={visible[key]}
                onChange={() => toggleVisibility(key)}
                className="rounded border-gray-300"
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. ROW OF 3 BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map && (
          <div className="bg-white p-4 rounded shadow relative">
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              12.4%
            </div>
            <h3 className="text-lg font-semibold mb-2">Map View</h3>
            <div className="bg-gray-100 h-48 rounded flex items-center justify-center text-gray-400">
              Map Image/Chart Placeholder
            </div>
          </div>
        )}

        {visible.calendar && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
            <div className="bg-gray-100 h-48 rounded flex items-center justify-center text-gray-400">
              Calendar Screenshot Placeholder
            </div>
          </div>
        )}

        {visible.projects && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Current Projects</h3>
            <ul className="space-y-2 text-sm">
              <li className="bg-gray-100 p-2 rounded">✅ Update contractor agreement</li>
              <li className="bg-gray-100 p-2 rounded">📅 Plan for next year</li>
              <li className="bg-gray-100 p-2 rounded">📋 Manage event planning</li>
            </ul>
          </div>
        )}
      </div>

      {/* 3. ROW OF 2 BLOCKS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visible.assigned && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Assigned To (ClickUp)</h3>
            <div className="bg-gray-100 rounded overflow-hidden">
              <img
                src="https://via.placeholder.com/600x300?text=ClickUp+Assigned+View"
                alt="ClickUp Assigned Screenshot"
                className="w-full"
              />
            </div>
          </div>
        )}

        {visible.news && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Latest News</h3>
            <ul className="space-y-2 text-sm">
              <li className="bg-gray-100 p-2 rounded">
                📰 Deathmatch - 5 mins ago
              </li>
              <li className="bg-gray-100 p-2 rounded">
                📘 Dark Fantasies 008 - 6 mins ago
              </li>
              <li className="bg-gray-100 p-2 rounded">
                🔍 Ecosystem Math - 8 mins ago
              </li>
              <li className="bg-gray-100 p-2 rounded">
                🎥 RAW Samples Report - 10 mins ago
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
