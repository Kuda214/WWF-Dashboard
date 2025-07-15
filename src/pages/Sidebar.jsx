import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  CalendarIcon,
  DownloadIcon,
  SettingsIcon,
  LogOutIcon,
  LockIcon,
  HomeIcon,
  LayoutDashboardIcon,
  BotIcon,
} from "lucide-react"; // You can use any icon library or custom icons

const Sidebar = () => {
  const [openSubNav, setOpenSubNav] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-800">
          <img
            src="https://icon2.cleanpng.com/lnd/20241123/kw/4c9122edfb53fff6770a8c8c679680.webp"
            alt="WWF Logo"
            className="h-12"
          />
          WWF
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {/* Home with subnav */}
          <NavLink
                    to="/SB/dashboard"
                    className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition ${
                        isActive ? "bg-green-800" : ""
                    }`
                    }
                >
            <LayoutDashboardIcon className="w-4 h-4" /> Dashboard
          </NavLink>
          
          <div>
            <button
              onClick={() => setOpenSubNav(!openSubNav)}
              className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-green-700 rounded-md transition"
            >
          

              <span className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4" /> Home
              </span>
              <span>{openSubNav ? "^" : "v"}</span>
            </button>
            {openSubNav && (
              <div className="ml-6 mt-1 space-y-1">
                <NavLink
                  to="/calendar"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm hover:bg-green-700 ${
                      isActive ? "bg-green-800" : ""
                    }`
                  }
                >
                  <CalendarIcon className="inline-block w-4 h-4 mr-2" /> Calendar
                </NavLink>
                <NavLink
                  to="/assigned"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm hover:bg-green-700 ${
                      isActive ? "bg-green-800" : ""
                    }`
                  }
                >
                  Assigned To
                </NavLink>
                <NavLink
                  to="/downloads"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md text-sm hover:bg-green-700 ${
                      isActive ? "bg-green-800" : ""
                    }`
                  }
                >
                  <DownloadIcon className="inline-block w-4 h-4 mr-2" /> Download Center
                </NavLink>
              </div>
            )}
          </div>

        <NavLink
            to="/SB/chatbot"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            <BotIcon className="w-4 h-4" /> Chatbot 
        </NavLink>

        <NavLink
            to="/SB/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            <SettingsIcon className="w-4 h-4" /> Profile
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            <SettingsIcon className="w-4 h-4" /> Settings
          </NavLink>

          <NavLink
            to="/access"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition ${
                isActive ? "bg-green-800" : ""
              }`
            }
          >
            <LockIcon className="w-4 h-4" /> Access
          </NavLink>

          <NavLink
            to="/logout"
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            <LogOutIcon className="w-4 h-4" /> Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
