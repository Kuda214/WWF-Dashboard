import React from "react";
import { ArrowLeft, Share2, User, Mail, FolderOpen, Calendar, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = ({ project, onClose }) => {
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: "Site Survey", status: "Active", dueDate: "2025-08-01" },
    { id: 2, title: "Community Engagement", status: "Completed", dueDate: "2025-06-15" },
    { id: 3, title: "Equipment Deployment", status: "Pending", dueDate: "2025-09-10" },
  ];

  const links = [
    { id: 1, title: "Project Plan", url: "https://example.com/project-plan" },
    { id: 2, title: "Progress Dashboard", url: "https://example.com/dashboard" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-800 font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-emerald-600 hover:text-emerald-800 flex items-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Projects
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-colors">
            <FolderOpen className="w-5 h-5 mr-2" />
            SharePoint Docs
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-colors">
            <Share2 className="w-5 h-5 mr-2" />
            Share Project
          </button>
        </div>
      </div>

      {/* Project Title and Overview */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
        <p className="mt-2 text-gray-600 text-lg">
          {project.subtitle || "A key initiative to drive impactful results"}

        </p>
        <p className="text-green-700">Project Duration:{project.startDate || "2025-01-01"} - {project.endDate || "2025-12-31"}  </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description, Notes, Links */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>

          {/* Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Notes</h2>
            <p className="text-gray-700 leading-relaxed">
              Ensure regular updates are submitted by the local team. Weekly impact reports due every Friday. Coordinate with stakeholders for quarterly reviews.
            </p>
          </div>

          {/* External Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Resources & Links</h2>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-emerald-600 hover:underline"
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Personnel, Tasks, Timeline */}
        <div className="space-y-8">
          {/* Assigned Personnel */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Assigned Personnel</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={project.ownerImg || "https://via.placeholder.com/48"}
                alt="Owner"
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-900">{project.manager || "Project Manager"}</p>
                <p className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  {project.email || "manager@example.org"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-700">Team Members:</p>
              {project.collaborators && project.collaborators.length > 0 ? (
                project.collaborators.map((img, i) => (
                  <img
                    key={i}
                    src={img || "https://via.placeholder.com/36"}
                    alt="collaborator"
                    className="w-9 h-9 rounded-full border-2 border-white shadow -ml-2"
                    title={`Team member ${i + 1}`}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">No collaborators assigned.</p>
              )}
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Project Tasks</h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    task.status === "Completed"
                      ? "bg-green-50 border-green-500"
                      : task.status === "Pending"
                      ? "bg-yellow-50 border-yellow-500"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Status: {task.status}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="font-semibold">Project Start</p>
                  <p className="text-sm text-gray-600">{project.startDate || "2025-01-01"}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="font-semibold">Expected Completion</p>
                  <p className="text-sm text-gray-600">{project.endDate || "2025-12-31"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;