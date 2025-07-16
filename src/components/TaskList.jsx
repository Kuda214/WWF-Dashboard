import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Tasks
      </h3>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li
            key={idx}
            className="p-2 rounded border dark:border-gray-600 text-sm text-gray-800 dark:text-white flex justify-between items-center"
          >
            <div>
              <strong>{task.title}</strong>
              <p className="text-xs text-gray-400">{task.due.toLocaleDateString()}</p>
            </div>
            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
              {task.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
