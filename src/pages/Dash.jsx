import React, { useState } from 'react';
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
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen space-y-4 md:space-y-6">
      {/* FILTER BAR */}
      <div className="w-full bg-gray-500 p-3 sm:p-4 rounded text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs sm:text-sm md:text-base font-medium">Filter by Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-2 py-1 sm:px-3 sm:py-2 border rounded text-white text-xs sm:text-sm md:text-base"
          >
            {['Oceans', 'Land', 'Wildlife', 'Circular Economy', 'Food', 'Climate & Energy', 'Water'].map((cat) => (
              <option className="text-black" key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          {Object.keys(visible).map((key) => (
            <label key={key} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
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

      {/* MAIN CONTENT GRID */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map && (
          <div className="bg-white p-3 sm:p-4 rounded shadow relative min-w-0">
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-green-600 text-white text-xs sm:text-lg font-bold px-4 sm:px-6 py-1 rounded">
              12.4%
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Global Coverage</h3>
            <WorldMapView />
          </div>
        )}

        {visible.calendar && (
          <div className="bg-white p-3 sm:p-4 rounded shadow min-h-[200px] sm:min-h-[300px] max-h-[50vh]">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Calendar</h3>
            <CalendarComponent height="15rem" showToolbar={false} />
          </div>

          
        )}

        {visible.projects && (
          <div className="bg-white p-3 sm:p-4 rounded shadow min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Active Projects</h3>
            <ResponsiveContainer width="100%" height="100%" minHeight={200} maxHeight={320}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="80%"
                  fill="#8884d8"
                  paddingAngle={3}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} projects`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* SECONDARY GRID */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visible.assigned && (
          <div className="bg-white p-3 sm:p-4 rounded shadow flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">Assigned To You (ClickUp)</h3>
              <a
                href="https://app.clickup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 sm:px-3 sm:py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs sm:text-sm"
              >
                Open in ClickUp
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              You have 4 active tasks. ClickUp reports increased productivity this week!
            </p>
            <div className="bg-gray-100 rounded overflow-hidden">
              <img src="/assets/clickup.png" alt="ClickUp Screenshot" className="w-full object-contain" />
            </div>
          </div>
        )}

        {visible.news && (
          <div className="bg-white p-3 sm:p-4 rounded shadow min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Latest News</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="bg-gray-100 p-2 sm:p-3 rounded">📰 Deathmatch - 5 mins ago</li>
              <li className="bg-gray-100 p-2 sm:p-3 rounded">📘 Dark Fantasies 008 - 6 mins ago</li>
              <li className="bg-gray-100 p-2 sm:p-3 rounded">🔍 Ecosystem Math - 8 mins ago</li>
              <li className="bg-gray-100 p-2 sm:p-3 rounded">🎥 RAW Samples Report - 10 mins ago</li>
            </ul>
          </div>
        )}

        {visible.projects && (
          <div className="bg-white p-3 sm:p-4 rounded shadow min-w-0">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4">Current Projects</h3>
            <div className="grid gap-2">
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-xs sm:text-sm">Update Contractor Agreement</h4>
                <p className="text-xs sm:text-sm text-gray-600">Due: 22 July | Status: Pending</p>
              </div>
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-xs sm:text-sm">Plan for Next Year</h4>
                <p className="text-xs sm:text-sm text-gray-600">Workshop pending | Status: Drafting</p>
              </div>
              <div className="bg-blue-50 p-2 rounded shadow-md">
                <h4 className="font-medium text-xs sm:text-sm">Manage Event Planning</h4>
                <p className="text-xs sm:text-sm text-gray-600">Coordinator: Jane | Status: In Progress</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}