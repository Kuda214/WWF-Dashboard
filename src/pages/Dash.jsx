import React, { useState } from 'react';
// Replace with your actual calendar component
import CalendarComponent from '../components/CalendarView';
import WorldMapView from '../components/WorldMapView';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';


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

  const data = [
  { name: 'Oceans', value: 12 },
  { name: 'Land', value: 8 },
  { name: 'Wildlife', value: 5 },
  { name: 'Food', value: 3 },
  { name: 'Climate & Energy', value: 7 },
  { name: 'Water', value: 4 },
];

const COLORS = ['#8e44ad', '#e74c3c', '#f1c40f', '#3498db', '#1abc9c', '#95a5a6'];


  return (
    <div className="p-6 bg-gray-100 min-h-[94vh] space-y-6">
      {/* 1. FILTER BAR */}
      <div className="w-full bg-gray-500 p-4 rounded text-white shadow-lg flex flex-wrap items-center justify-between gap-4 border-1 border-green-200">
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Filter by Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border rounded text-white"
          >
            <option className=" text-gray-900" >Oceans</option>
            <option className=" text-gray-900">Land</option>
            <option className=" text-gray-900">Wildlife</option>
            <option className=" text-gray-900">Circular Economy</option>
            <option className=" text-gray-900">Food</option>
            <option className=" text-gray-900">Climate & Energy</option>
            <option className=" text-gray-900">Water</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.keys(visible).map((key) => (
            <label key={key} className="flex items-center space-x-2 text-md">
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

      {/* 2. DYNAMIC ROW OF BLOCKS */}
      <div
        className={`grid gap-6 transition-all`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
        }}
      >
        {visible.map && (
          <div className="bg-white p-4 rounded shadow relative">
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xl font-bold px-8 py-2 rounded mt-10">
              12.4%
            </div>
            <h3 className="text-lg font-semibold mb-4">Global Coverage</h3>
            <WorldMapView />
          </div>
        )}

        {visible.calendar && (
          <div className="bg-white p-4 rounded shadow h-[45vh]">
            <h3 className="text-lg font-semibold mb-4">Calendar</h3>
            <CalendarComponent height="36vh" showToolbar={false}  />
          </div>
        )}

         {visible.projects && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Active Projects</h3>
             <div className="w-full h-full">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={3}
                    label={({ name, value, percent }) =>
                      `${name}: ${(value )}`
                    }
                    isAnimationActive={true}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} projects`, name]} />
                  {/* <Legend layout="vertical" verticalAlign="middle" align="right" /> */}
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
       
      </div>

      {/* 3. SECOND ROW */}
      <div
        className={`grid gap-6 h-[32vh]`}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
        }}
      >
        {visible.assigned && (
          <div className="bg-white p-4 rounded shadow flex flex-col h-[32vh] w-[34vw]">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold mb-4">Assigned To You (ClickUp)</h3>
            <span>
                <a
                  href="https://app.clickup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start px-4 py-3 mt-auto bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                >
                  Open in ClickUp
                </a>
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">
              You have 4 active tasks. ClickUp reports increased productivity this week!
            </p>
            <div className="bg-gray-100 rounded overflow-hidden mb-3">
              <img
                src="\assets\clickup.png"
                alt="ClickUp Assigned Screenshot"
                className="w-full"
              />
            </div>
            
          </div>
        )}

        {visible.news && (
          <div className="bg-white p-4 rounded shadow w-[19vw] ml-35 h-[32vh] ">
            <h3 className="text-lg font-semibold mb-4">Latest News</h3>
            <ul className="space-y-3 text-sm">
              <li className="bg-gray-100 p-3 rounded">📰 Deathmatch - 5 mins ago</li>
              <li className="bg-gray-100 p-3 rounded">📘 Dark Fantasies 008 - 6 mins ago</li>
              <li className="bg-gray-100 p-3 rounded">🔍 Ecosystem Math - 8 mins ago</li>
              <li className="bg-gray-100 p-3 rounded">🎥 RAW Samples Report - 10 mins ago</li>
            </ul>
          </div>
        )}

         {visible.projects && (
          <div className="bg-white p-4 rounded shadow-lg h-[32vh] ">
            <h3 className="text-lg font-semibold mb-4">Current Projects</h3>
            <div className="grid gap-2">
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-sm">Update Contractor Agreement</h4>
                <p className="text-sm text-gray-600">Due: 22 July | Status: Pending</p>
              </div>
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-sm">Plan for Next Year</h4>
                <p className="text-sm text-gray-600">Workshop pending | Status: Drafting</p>
              </div>
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-md">Manage Event Planning</h4>
                <p className="text-sm text-gray-600">Coordinator: Jane | Status: In Progress</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
