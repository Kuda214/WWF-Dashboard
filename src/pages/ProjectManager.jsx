// ProjectDashboard.jsx
import React from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Menu,
  User,
  Settings,
  Bell,
} from "lucide-react";

export default function ProjectDashboard() {
  return (
    <div className="flex h-screen w-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 font-bold text-xl border-b">ProjectManager</div>
        <nav className="flex-1 p-4 space-y-4 text-gray-600">
          <div className="flex items-center gap-2 hover:text-blue-500">
            <Briefcase size={18} />
            Projects
          </div>
          <div className="flex items-center gap-2 hover:text-blue-500">
            <Clock size={18} />
            Timeline
          </div>
          <div className="flex items-center gap-2 hover:text-blue-500">
            <CheckCircle size={18} />
            Tasks
          </div>
          <div className="flex items-center gap-2 hover:text-blue-500">
            <User size={18} />
            Team
          </div>
          <div className="flex items-center gap-2 hover:text-blue-500">
            <Settings size={18} />
            Settings
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-600" />
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { title: "Active Projects", value: 5 },
            { title: "Completed Tasks", value: 132 },
            { title: "Pending Reviews", value: 8 },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-sm text-gray-500 mb-1">{card.title}</h2>
              <p className="text-2xl font-bold text-blue-600">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Project Progress Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="font-semibold text-lg mb-4">Project Progress</h2>
            <div className="space-y-4">
              {[
                { name: "Website Redesign", progress: 72 },
                { name: "Mobile App", progress: 45 },
                { name: "Marketing Plan", progress: 30 },
              ].map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span>{proj.name}</span>
                    <span className="text-sm text-gray-500">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="font-semibold text-lg mb-4">Team Activity</h2>
            <ul className="space-y-3 text-sm">
              <li>
                ✅ Alice completed *Homepage UI* — <span className="text-gray-400">1h ago</span>
              </li>
              <li>
                📝 John created *New Sprint* — <span className="text-gray-400">2h ago</span>
              </li>
              <li>
                🔄 Review pending on *API Integration* —{" "}
                <span className="text-gray-400">3h ago</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tasks Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="font-semibold text-lg mb-4">Tasks Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["To Do", "In Progress", "Done"].map((status, idx) => (
              <div key={idx}>
                <h3 className="font-semibold mb-2">{status}</h3>
                <div className="space-y-2">
                  {["Design login", "Fix bugs", "Update readme"].map((task, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
                    >
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
