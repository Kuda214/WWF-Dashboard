import React from "react";
import { ArrowLeft, Share2, User, Mail, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom"; // If using React Router

const ProjectDetails = ({ project , onClose}) => {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: "Site Survey", status: "Active" },
    { id: 2, title: "Community Engagement", status: "Completed" },
    { id: 3, title: "Equipment Deployment", status: "Pending" },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800 font-sans">
      {/* Back Button */}
      <button
         onClick={onClose}
        className="mb-6 text-emerald-600 hover:underline flex items-center"
      >
        <ArrowLeft className="mr-2" /> Back to Projectss
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded shadow hover:bg-emerald-700 flex items-center">
          <FolderOpen className="mr-2" />
          SharePoint Docs
        </button>
      </div>

      {/* Description & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="bg-white p-4 rounded shadow">{project.description || "No description provided."}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Notes</h2>
          <p className="bg-white p-4 rounded shadow">Ensure regular updates are submitted by the local team. Weekly impact reports due every Friday.</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Assigned Personnel</h2>
        <div className="flex items-center space-x-4 mb-4">
          <img src={project.ownerImg} alt="Owner" className="w-12 h-12 rounded-full border" />
          <div>
            <p className="font-bold">{project.manager}</p>
            <p className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-1" /> {project.email || "manager@example.org"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-medium">Team Members:</p>
          {project.collaborators.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="collaborator"
              className="w-9 h-9 rounded-full border-2 border-white shadow -ml-2"
              title={`Team member ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Project Tasks</h2>
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded border-l-4 shadow ${
                task.status === "Completed"
                  ? "bg-green-100 border-green-500"
                  : task.status === "Pending"
                  ? "bg-yellow-100 border-yellow-500"
                  : "bg-blue-100 border-blue-500"
              }`}
            >
              <h3 className="font-semibold">{task.title}</h3>
              <span className="text-sm">{task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
