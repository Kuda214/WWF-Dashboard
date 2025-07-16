import { useState } from "react";
import CalendarView from "../components/CalendarView";
import TaskList from "../components/TaskList";
import React from "react";

const PersonalCalendar = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
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
      setTasks((prev) => [...prev, { title: newTask.title, due: new Date(newTask.due), type: "task" }]);
      setNewTask({ title: "", due: "" });
      setIsTaskModalOpen(false);
    }
  };

  const handleSyncTeams = () => {
    // Placeholder for Teams sync functionality
    alert("Syncing with Microsoft Teams calendar...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Calendar</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              + Add Task
            </button>
            <button
              onClick={handleSyncTeams}
              className="bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Sync with Teams
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CalendarView
                events={events}
                onDoubleClickSlot={handleAddEvent}
                onSelectEvent={(event) => alert(`Event: ${event.title}`)}
                className="text-gray-900"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <TaskList tasks={tasks} className="text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add New Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={newTask.due}
                  onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
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