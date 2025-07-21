import React from "react";
import {
  UserCheckIcon,
  CalendarClockIcon,
  ClipboardListIcon,
  BellIcon,
} from "lucide-react";

const groupedNotifications = {
  Today: [
    {
      icon: <UserCheckIcon className="w-5 h-5 text-green-600" />,
      message: "Jane Smith gave you access to Project X.",
      time: "2 min ago",
    },
    {
      icon: <ClipboardListIcon className="w-5 h-5 text-blue-600" />,
      message: "Task added: 'Prepare Q2 Report'.",
      time: "10 min ago",
    },
    {
      icon: <CalendarClockIcon className="w-5 h-5 text-yellow-600" />,
      message: "Meeting in 15 minutes: 'Finance Sync'.",
      time: "30 min ago",
    },
  ],
  Yesterday: [
    {
      icon: <BellIcon className="w-5 h-5 text-gray-500" />,
      message: "System update completed.",
      time: "21 hours ago",
    },
  ],
   Last_Week: [
    {
      icon: <BellIcon className="w-5 h-5 text-gray-500" />,
      message: "System update completed.",
      time: "A week ago",
    },
    {
      icon: <UserCheckIcon className="w-5 h-5 text-green-600" />,
      message: "Jane Smith gave you access to Project X.",
      time: "2 min ago",
    },
    {
      icon: <ClipboardListIcon className="w-5 h-5 text-blue-600" />,
      message: "Task added: 'Prepare Q2 Report'.",
      time: "10 min ago",
    },
    {
      icon: <CalendarClockIcon className="w-5 h-5 text-yellow-600" />,
      message: "Meeting in 15 minutes: 'Finance Sync'.",
      time: "30 min ago",
    },
    {
      icon: <UserCheckIcon className="w-5 h-5 text-green-600" />,
      message: "Jane Smith gave you access to Project X.",
      time: "2 min ago",
    },
    {
      icon: <ClipboardListIcon className="w-5 h-5 text-blue-600" />,
      message: "Task added: 'Prepare Q2 Report'.",
      time: "10 min ago",
    },
    {
      icon: <CalendarClockIcon className="w-5 h-5 text-yellow-600" />,
      message: "Meeting in 15 minutes: 'Finance Sync'.",
      time: "30 min ago",
    },
  ],
};

const NotificationsPanel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 h-[80vh] overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h2>
      <div className="overflow-y-auto max-h-[65vh] pr-2 space-y-10">
        {Object.entries(groupedNotifications).map(([group, items], i) => (
          <div key={i}>
            <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
              {group}
            </h3>
            <ul className="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-6">
              {items.map((notif, idx) => (
                <li key={idx} className="relative flex items-start gap-4">
                  <span className="absolute -left-[10px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-green-400" />
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-gray-100 rounded-full shadow">{notif.icon}</div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-800 font-medium">{notif.message}</p>
                    <span className="text-xs text-gray-400 mt-1">{notif.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
