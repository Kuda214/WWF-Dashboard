import { useState } from "react";
import CalendarView from "../components/CalendarView";
import TaskList from "../components/TaskList";
import React from "react";

const PersonalCalendar = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([
    { title: "Finish project proposal", due: new Date("2025-07-25"), type: "task" },
    { title: "Prepare presentation slides", due: new Date("2025-07-27"), type: "task" },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", due: "" });

  const handleAddEvent = ({ start, end }) => {
    const title = prompt("Event/Meeting Title?");
    if (title) {
      const newEvent = {
        title,
        start,
        end,
        type: "meeting",
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.due) {
      setTasks((prev) => [
        ...prev,
        { title: newTask.title, due: new Date(newTask.due), type: "task" },
      ]);
      setNewTask({ title: "", due: "" });
      setIsTaskModalOpen(false);
    }
  };

  const handleSyncTeams = () => {
    alert("Syncing with Microsoft Teams calendar...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">My Calendar</h1>
          <div className="space-x-2">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              + Add Task
            </button>
            <button
              onClick={handleSyncTeams}
              className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Sync with Teams
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex gap-6 h-[76vh]">
          {/* Left Pane */}
          <div
            style={{ width: "35vw" }}
            className="space-y-2 overflow-y-auto max-h-[76vh] px-2 sm:px-3 text-sm sm:text-base"
          >
            {/* Recorded Meetings */}
            <div className="bg-white rounded-xl shadow p-3 sm:p-4">
              <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">
                📼 Recorded Meetings
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="hover:text-green-600 hover:underline text-blue-500">• Weekly Sync – July 10</li>
                <li className="hover:text-green-600 hover:underline text-blue-500">• Marketing Review – July 15</li>
                <li className="hover:text-green-600 hover:underline text-blue-500">• Planning Sprint – July 18</li>
              </ul>
            </div>

            {/* Meeting Room */}
            <div className="bg-white rounded-xl shadow p-3 sm:p-4">
              <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">🧑‍💼 Meeting Room</h2>
              <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4">
                This is a space for scheduled calls, quick video links, or live chats.
              </p>
              <div className="border border-gray-200 rounded-md p-2 sm:p-3 mb-3 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Team Sync-up</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">July 25, 2025 - 10:00 AM to 11:00 AM</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Zoom Meeting</p>
                  </div>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 sm:px-4 sm:py-1 rounded-md text-xs sm:text-sm whitespace-nowrap"
                    onClick={() => alert("Joining Team Sync-up meeting...")}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-xl shadow p-3 sm:p-4">
              <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">✅ Task List</h2>
              <TaskList tasks={tasks} className="text-gray-900 text-xs sm:text-sm" />
            </div>
          </div>

          {/* Calendar View */}
          <div style={{ width: "65vw" }} className="overflow-hidden">
            <div className="bg-white rounded-xl shadow-lg h-full">
              <CalendarView
                events={events}
                onDoubleClickSlot={handleAddEvent}
                onSelectEvent={(event) => alert(`Event: ${event.title}`)}
                className="text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={newTask.due}
                  onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsTaskModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalCalendar;
