import React, { useState } from "react";
import { Briefcase, Share2 } from "lucide-react";
import AddProjectForm from "../components/AddProject";
import ProjectDetails from "./ProjectDetails";

const categoryColors = {
  Oceans: "border-blue-500",
  Land: "border-yellow-600",
  Wildlife: "border-green-700",
  "Circular Economy": "border-purple-500",
  Food: "border-amber-600",
  "Climate & Energy": "border-red-500",
  Water: "border-cyan-500",
};

const mockProjects = [
  {
    id: 1,
    title: "Coral Reef Cleanup",
    category: "Oceans",
    status: "Active",
    manager: "Lindiwe",
    description: "This project focuses on the comprehensive cleanup and ecological restoration of coral reef systems that have been degraded by pollution, climate change, and human activities. The initiative involves removing harmful debris such as plastics and fishing nets, monitoring water quality, and reintroducing native coral species through coral gardening and transplantation techniques. By engaging local communities, scientists, and volunteers, the project aims to revive reef biodiversity, enhance marine habitats, and promote sustainable practices to safeguard these vital ecosystems for future generations. Ongoing data collection and impact assessments will guide adaptive management strategies to ensure long-term reef resilience and health.",
    email: "lindiwe@conservation.org",
    ownerImg: "https://i.pravatar.cc/150?img=32",
    collaborators: [
      "https://i.pravatar.cc/150?img=12",
      "https://i.pravatar.cc/150?img=23",
      "https://i.pravatar.cc/150?img=45",
    ],
  },
  {
    id: 2,
    title: "Anti-Poaching Initiative",
    category: "Wildlife",
    status: "On Hold",
    manager: "Amina",
    description: "Combating illegal poaching in national parks.",
    email: "amina@conservation.org",
    ownerImg: "https://i.pravatar.cc/150?img=19",
    collaborators: [
      "https://i.pravatar.cc/150?img=14",
      "https://i.pravatar.cc/150?img=5",
    ],
  },
  {
  id: 7,
  title: "Mangrove Restoration Initiative",
  category: "Oceans",
  status: "Active",
  manager: "Thandi",
  description: "Restoring degraded mangrove forests along the coastline to improve shoreline protection, enhance fish nursery habitats, and increase carbon sequestration. This project involves planting native mangrove species, community engagement to reduce harmful activities, and continuous monitoring to track forest health and biodiversity recovery.",
  email: "thandi@conservation.org",
  ownerImg: "https://i.pravatar.cc/150?img=48",
  collaborators: [
    "https://i.pravatar.cc/150?img=25",
    "https://i.pravatar.cc/150?img=36",
    "https://i.pravatar.cc/150?img=44",
  ],
},
{
  id: 8,
  title: "Sustainable Fisheries Management",
  category: "Oceans",
  status: "On Hold",
  manager: "Sipho",
  description: "Implementing sustainable fishing practices by collaborating with local fishermen to establish quotas, protected breeding areas, and promote selective fishing gear that minimizes bycatch. The goal is to balance economic livelihoods with conservation to maintain healthy fish populations and marine ecosystems.",
  email: "sipho@conservation.org",
  ownerImg: "https://i.pravatar.cc/150?img=49",
  collaborators: [
    "https://i.pravatar.cc/150?img=26",
    "https://i.pravatar.cc/150?img=31",
  ],
},
{
  id: 9,
  title: "Coastal Plastic Waste Reduction",
  category: "Oceans",
  status: "Active",
  manager: "Naledi",
  description: "Addressing plastic pollution in coastal areas by organizing regular beach cleanups, installing waste capture devices in waterways, and running awareness campaigns focused on reducing single-use plastics. The project also supports research into the impacts of microplastics on marine life and promotes policy advocacy for plastic waste management.",
  email: "naledi@conservation.org",
  ownerImg: "https://i.pravatar.cc/150?img=40",
  collaborators: [
    "https://i.pravatar.cc/150?img=30",
    "https://i.pravatar.cc/150?img=15",
    "https://i.pravatar.cc/150?img=28",
  ],
},

  // Add other mock projects as needed...
];

export default function ProjectDashboard() {
  const [category, setCategory] = useState("Oceans");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = mockProjects.filter(
    (project) => project.category === category
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 font-sans text-gray-800 p-6">
      {selectedProject ? (
        // <ProjectDetails project={selectedProject} />
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)} // <-- THIS controls closing
        />
      ) : (
        <>
          {/* Top Filter Bar */}
          <div className="w-full bg-gray-700 p-4 rounded text-white shadow-md flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="font-medium">Filter by Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-gray-900 text-white border border-gray-300 rounded"
              >
                {Object.keys(categoryColors).map((cat) => (
                  <option key={cat} className="text-white">{cat}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow"
            >
              + Add New Project
            </button>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`relative cursor-pointer bg-white p-6 rounded shadow pl-4 border-l-4 ${
                    categoryColors[project.category] || "border-gray-300"
                  } hover:shadow-lg transition`}
                >
                  <Share2 className="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 cursor-pointer" size={26} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <img
                      src={project.ownerImg}
                      alt="Owner"
                      className="w-9 h-9 rounded-full border-2 border-white shadow"
                    />
                    <span className="font-medium">{project.manager}</span>
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    Category: <span className="font-semibold">{project.category}</span>
                  </p>
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded-full mb-3 ${
                      project.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : project.status === "Completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="flex items-center mt-2">
                    <p className="mr-2">Team Members:</p>
                    <div className="flex -space-x-3">
                      {project.collaborators.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Collaborator"
                          className="w-8 h-8 rounded-full border-2 border-white shadow"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No projects found in <span className="font-semibold">{category}</span> category.
              </div>
            )}
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full relative">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
                <AddProjectForm
                  currentUser={{ id: 1, name: "Kuda", avatar: "https://i.pravatar.cc/150?img=52" }}
                  users={[
                    { id: 2, name: "Lindiwe", avatar: "https://i.pravatar.cc/150?img=14" },
                    { id: 3, name: "Thabo", avatar: "https://i.pravatar.cc/150?img=23" },
                    { id: 4, name: "Naledi", avatar: "https://i.pravatar.cc/150?img=38" },
                  ]}
                  onSubmit={(newProject) => {
                    console.log("Saved:", newProject);
                    setShowAddForm(false);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
