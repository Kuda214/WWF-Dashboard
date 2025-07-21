import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  DownloadIcon,
  SettingsIcon,
  LogOutIcon,
  LockIcon,
  LayoutDashboardIcon,
  BotIcon,
  ChevronLeft,
  ChevronRight,
  PhoneIcon,
  BellIcon,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-green-700 ${
      isActive ? "bg-green-800" : ""
    }`;
  
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-black text-white flex flex-col transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } relative`}
      >
        {/* Top Logo */}
        <div className="flex items-center gap-2 h-16 px-4 border-b border-gray-800 sticky top-0 bg-black z-10">
          <img
            src="https://icon2.cleanpng.com/lnd/20241123/kw/4c9122edfb53fff6770a8c8c679680.webp"
            alt="WWF Logo"
            className={`h-16 -ml-5 object-contain transition-all duration-300  ${
              isCollapsed ? "flex-grow ml-0" : "w-16"
            }`}
          />
          {!isCollapsed && <span className="text-xl font-bold ml-4">WWF</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <NavLink to="/SB/dashboard" className={navItemClass}>
            <LayoutDashboardIcon size={18} />
            {!isCollapsed && "Dashboard"}
          </NavLink>

          <NavLink to="/SB/notifications" className={navItemClass}>
            <BellIcon size={18} />
            {!isCollapsed && "Notifications"}
          </NavLink>

          <NavLink to="/SB/download-center" className={navItemClass}>
            <DownloadIcon size={18} />
            {!isCollapsed && "Download Center"}
          </NavLink>

          <NavLink to="/SB/project-management" className={navItemClass}>
            <SettingsIcon size={18} />
            {!isCollapsed && "Manage Projects"}
          </NavLink>

          <NavLink to="/SB/chatbot" className={navItemClass}>
            <BotIcon size={18} />
            {!isCollapsed && "Panda"}
          </NavLink>

          <NavLink to="/SB/profile" className={navItemClass}>
            <SettingsIcon size={18} />
            {!isCollapsed && "My Team"}
          </NavLink>

          <NavLink to="/SB/calendar" className={navItemClass}>
            <CalendarIcon size={18} />
            {!isCollapsed && "Calendar & Tasks"}
          </NavLink>

          <NavLink to="/SB/settings" className={navItemClass}>
            <SettingsIcon size={18} />
            {!isCollapsed && "Settings"}
          </NavLink>

          <NavLink to="/" className={navItemClass}>
            <LogOutIcon size={18} />
            {!isCollapsed && "Logout"}
          </NavLink>
        </nav>

        {/* Toggle Arrow */}
        <button
          onClick={toggleSidebar}
          className="absolute top-8 right-3 transform translate-x-full bg-green-700 text-white p-1 rounded-full shadow-md hover:bg-green-800 z-10"
        >
          {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>

        {/* Logged-in User Info */}
        <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-700 text-white">
          <img
            src="https://cdn.pixabay.com/photo/2019/11/03/23/28/black-businessman-4599850_640.jpg" // optional
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover border-white border-1"
          />
          <div>
           
            {!isCollapsed &&
              <>
                <p className="text-md font-medium">Hi, Tanaka HC</p> 
                <p className="text-sm text-gray-400">Conservation Project Officer</p> 
              </> 
            }
          </div>
        </div>

        <div className="items-center justify-center mt-4 width-full space-y-1 ml-3">
          <button onClick={() => navigate("/SB/support")}
             className="text-gray-900 hover:text-green-600 justify-center items-center rounded-lg flex gap-2 bg-gray-200 px-4 py-2">
            <PhoneIcon size={18} />
            {!isCollapsed && "Support"}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 px-2 py-4 border-t border-gray-800">
           {/* Support */}
          {!isCollapsed && (
            <>
              <p>Internal Dashboard Tool</p>
              <p>WWF © 2025</p>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
