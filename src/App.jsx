import React from "react";
import {

  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Sidebar from "./layout/Sidebar"; // The sidebar layout file
import Home from "./pages/Home";
import Sidebar_ from "./pages/Sidebar";
import ProfileScreen from "./pages/Profile";
import Dashboard from "./pages/Dash";
import Chatbot from "./pages/Chatbot";
import DownloadCenter from "./pages/DownloadCenter";
import Calendar from "./pages/Calendar";
import ProjectManager from "./pages/ProjectManager";
import { Download, Settings, Sidebar } from "lucide-react";
import  SettingsScreen  from "./pages/SettingsScreen";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import ManageUsers from "./pages/RegisterUser";
// import Calendar from "./pages/Calendar";
// import AssignedTo from "./pages/AssignedTo";
// import DownloadCenter from "./pages/DownloadCenter";
// import Settings from "./pages/Settings";
// import Access from "./pages/Access";
// import Logout from "./pages/Logout";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/SB" element={<Sidebar_ />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="download-center"  element={<DownloadCenter />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="project-management" element={<ProjectManager />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="support" element={<Support />} />
          <Route path="users" element={<ManageUsers/>} />
        </Route>



          {/* <Route path="calendar" element={<Calendar />} />
          <Route path="assigned" element={<AssignedTo />} />
          <Route path="downloads" element={<DownloadCenter />} />
          <Route path="settings" element={<Settings />} />
          <Route path="access" element={<Access />} />
          <Route path="logout" element={<Logout />} /> */}

      </Routes>
  );
}

export default App;