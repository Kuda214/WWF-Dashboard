import React, { useState } from "react";

const categories = [
  "Oceans",
  "Land",
  "Wildlife",
  "Circular Economy",
  "Food",
  "Climate & Energy",
  "Water",
];

const statuses = ["Active", "On Hold", "Completed"];

export default function AddProjectForm({ currentUser, users, onSubmit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Oceans");
  const [status, setStatus] = useState("Active");
  const [collaborators, setCollaborators] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Title and description are required.");
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      description: desc,
      category,
      status,
      owner: currentUser.name,
      ownerImg: currentUser.avatar,
      collaborators,
      startDate,
      endDate,
    };

    onSubmit(newProject);
    // Reset
    setTitle("");
    setDesc("");
    setCollaborators([]);
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-xl w-full">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Project Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Collaborators</label>
        <select
          multiple
          value={collaborators}
          onChange={(e) =>
            setCollaborators(
              Array.from(e.target.selectedOptions, (opt) => opt.value)
            )
          }
          className="w-full border px-3 py-2 rounded h-24"
        >
          {users
            .filter((u) => u.id !== currentUser.id)
            .map((user) => (
              <option key={user.id} value={user.avatar}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
      >
        Save Project
      </button>
    </form>
  );
}
