import { useState } from 'react';
import React from 'react';

// Sample data for team members with tasks, efficiency, region, status, and projects
const teamMembers = [
  {
    id: 1,
    name: 'Jane Smith',
    title: 'Conservation Director',
    avatar: 'https://cdn.pixabay.com/photo/2022/09/12/14/27/man-7449546_640.png',
    tasks: [
      { id: 1, title: 'Plan Q4 Conservation Strategy', status: 'In Progress', dueDate: '2025-07-15' },
      { id: 2, title: 'Review Conservation Reports', status: 'Completed', dueDate: '2025-07-10' },
    ],
    efficiency: [70, 75, 80, 85, 90],
    region: 'Global',
    status: 'online',
  },
  {
    id: 2,
    name: 'John Doe',
    title: 'Marine Biologist',
    avatar: 'https://cdn.pixabay.com/photo/2022/09/12/14/27/man-7449546_640.png',
    tasks: [
      { id: 1, title: 'Monitor Coral Reef Health', status: 'In Progress', dueDate: '2025-07-20' },
      { id: 2, title: 'Analyze Fish Population Data', status: 'Pending', dueDate: '2025-07-18' },
    ],
    efficiency: [65, 70, 68, 72, 80],
    region: 'Pacific Ocean',
    status: 'offline',
    projects: {
      Oceans: [
        { id: 1, name: 'Coral Restoration', access: 'Edit' },
        { id: 2, name: 'Marine Protected Areas', access: 'Read' },
      ],
      Land: [],
      Wildlife: [],
      Food: [],
      Climate: [],
      Water: [],
    },
  },
  {
    id: 3,
    name: 'Alice Brown',
    title: 'Wildlife Specialist',
    avatar: 'https://cdn.pixabay.com/photo/2022/09/12/14/27/man-7449546_640.png',
    tasks: [
      { id: 1, title: 'Track Elephant Migration', status: 'Completed', dueDate: '2025-07-12' },
      { id: 2, title: 'Design Conservation Posters', status: 'In Progress', dueDate: '2025-07-19' },
    ],
    efficiency: [80, 82, 85, 88, 90],
    region: 'Africa',
    status: 'online',
    projects: {
      Oceans: [],
      Land: [],
      Wildlife: [
        { id: 1, name: 'Rhino Protection', access: 'Edit' },
        { id: 2, name: 'Elephant Tracking', access: 'View' },
      ],
      Food: [],
      Climate: [],
      Water: [],
    },
  },
  {
    id: 4,
    name: 'Mark Wilson',
    title: 'Climate Analyst',
    avatar: 'https://cdn.pixabay.com/photo/2022/09/12/14/27/man-7449546_640.png',
    tasks: [
      { id: 1, title: 'Analyze Carbon Emissions', status: 'In Progress', dueDate: '2025-07-14' },
      { id: 2, title: 'Prepare Climate Report', status: 'Pending', dueDate: '2025-07-21' },
    ],
    efficiency: [60, 65, 70, 75, 80],
    region: 'Australia',
    status: 'online',
    projects: {
      Oceans: [],
      Land: [],
      Wildlife: [],
      Food: [],
      Climate: [
        { id: 1, name: 'Renewable Energy Study', access: 'Read' },
        { id: 2, name: 'Deforestation Impact', access: 'Edit' },
      ],
      Water: [],
    },
  },
];

// Sample team efficiency data
const teamStats = {
  totalTasks: 42,
  completedTasks: 30,
  avgEfficiency: 82,
  activeProjects: 5,
};

export default function MyTeamScreen() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [activeTab, setActiveTab] = useState('Efficiency');
  const [openCategory, setOpenCategory] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setActiveTab('Access'); 
  };

  // Filter team members based on search and role
  const filteredMembers = teamMembers.slice(1).filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterRole === 'all' || member.title === filterRole)
  );

  // Toggle category dropdown
  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Handle access change
  const handleAccessChange = (memberId, category, projectId, access) => {
    // In a real app, this would update the backend
    console.log(`Set access for member ${memberId}, project ${projectId} in ${category} to ${access}`);
  };

  // Efficiency Graph Component
  const EfficiencyGraph = ({ data }) => (
    <div className="flex items-end h-40 space-x-2">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-emerald-600 w-8 rounded-t"
          style={{ height: `${value}%` }}
          title={`Week ${index + 1}: ${value}%`}
        ></div>
      ))}
    </div>
  );

  // Calculate overdue tasks
  const overdueTasks = teamMembers.reduce(
    (count, member) =>
      count +
      member.tasks.filter(
        (task) => new Date(task.dueDate) < new Date('2025-07-17') && task.status !== 'Completed'
      ).length,
    0
  );

  const categoryColors = {
  Oceans: "bg-green-600",
  Land: "bg-blue-600",
  Wildlife: "bg-orange-600",
  Food: "bg-yellow-500",
  Climate: "bg-red-600",
  Water: "bg-teal-600",
};

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8 font-sans">
      {/* Left Panel: Profile + Team Members */}
      <div className="w-1/3 max-w-sm bg-white rounded-xl shadow-lg p-6">
        <div
          className={`text-center cursor-pointer p-3 rounded-lg hover:bg-emerald-100 transition-colors ${
            selectedMember?.id === teamMembers[0].id ? 'ring-2 ring-emerald-500' : ''
          }`}
          onClick={() => handleMemberClick(teamMembers[0])}
        >
          <img
            src={teamMembers[0].avatar}
            alt="Profile"
            className="mx-auto rounded-full w-36 h-36 mb-4 border-2 border-gray-300 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-900">{teamMembers[0].name}</h2>
          <p className="text-emerald-700 text-lg">{teamMembers[0].title}</p>
          <span
            className={`inline-block h-3 w-3 rounded-full mt-2 ${
              teamMembers[0].status === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Conservation Team</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="mt-2 w-full p-2 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Roles</option>
              <option value="Marine Biologist">Marine Biologist</option>
              <option value="Wildlife Specialist">Wildlife Specialist</option>
              <option value="Climate Analyst">Climate Analyst</option>
              <option value="Conservation Director">Conservation Director</option>
            </select>
          </div>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`flex items-center bg-emerald-50 rounded-lg p-3 cursor-pointer hover:bg-emerald-100 transition-colors ${
                  selectedMember?.id === member.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => handleMemberClick(member)}
              >
                <img
                  src={member.avatar}
                  alt={`${member.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div className="text-left flex-1">
                  <p className="text-gray-900 font-medium">{member.name}</p>
                  <p className="text-emerald-700 text-sm">{member.title}</p>
                </div>
                <span
                  className={`h-3 w-3 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel: Team Efficiency or Member Details */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
        {!selectedMember ? (
          <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Team Conservation Impact</h2>

          {overdueTasks > 0 && (
            <div className="mb-6 bg-red-100 text-red-800 p-3 rounded-lg flex items-center">
              <span className="inline-flex items-center justify-center h-6 w-6 bg-red-500 text-white rounded-full mr-2">
                {overdueTasks}
              </span>
              Overdue Tasks
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-emerald-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Total Conservation Tasks</h3>
              <p className="text-3xl font-bold text-emerald-600">{teamStats.totalTasks}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Completed Tasks</h3>
              <p className="text-3xl font-bold text-emerald-600">{teamStats.completedTasks}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Average Impact Efficiency</h3>
              <p className="text-3xl font-bold text-emerald-600">{teamStats.avgEfficiency}%</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">Active Conservation Projects</h3>
              <p className="text-3xl font-bold text-emerald-600">{teamStats.activeProjects}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Highlights */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Highlights</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>New mangrove restoration zone added in Mozambique.</li>
                <li>Community workshop held with 45+ attendees.</li>
                <li>Bird migration tracking tech successfully deployed.</li>
              </ul>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Contributors</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Jane M. – 26 tasks</li>
                <li>Thabo K. – 21 tasks</li>
                <li>Fatima R. – 18 tasks</li>
              </ol>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Milestones</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 mr-3"></span>
                  <div>
                    <strong>Jul 20:</strong> Project report submission deadline
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 mr-3"></span>
                  <div>
                    <strong>Jul 25:</strong> Drone mapping session for Zone 3
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 mr-3"></span>
                  <div>
                    <strong>Aug 1:</strong> Quarterly team review
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button className="bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-emerald-700 transition">
              Add New Task
            </button>
          </div>
        </div>

        ) : (
          <div>
            <button
              className="mb-6 text-emerald-600 hover:text-emerald-800 font-medium"
              onClick={() => setSelectedMember(null)}
            >
              ← Back to Team Overview
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{selectedMember.name}'s Conservation Dashboard</h2>
            {/* Tabs */}
            <div className="flex border-b border-emerald-200 mb-6">
              {selectedMember.id !== 1 && (
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === 'Access'
                      ? 'border-b-2 border-emerald-600 text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                  onClick={() => setActiveTab('Access')}
                >
                  Access
                </button>
              )}
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'Efficiency'
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
                onClick={() => setActiveTab('Efficiency')}
              >
                Efficiency
              </button>
            </div>
            {activeTab === 'Access' && selectedMember.id !== 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900 mb-4  ">Project Access Management</h3>
                {['Oceans', 'Land', 'Wildlife', 'Food', 'Climate', 'Water'].map((category) => (
                  <div key={category} className="border-b border-emerald-200">
                    <button
                      className = {`w-full text-left py-2 px-4 bg-gray-200 hover:bg-emerald-100 rounded-lg flex justify-between items-center  
                        border-b border-gray-200 p-4 text-white `}
                      onClick={() => toggleCategory(category)}
                    >
                      <span className="text-gray-900 font-medium">{category }  </span>
                      <span className='text-gray-500'>{openCategory === category ? '▲' : '▼'}</span>
                    </button>
                    {openCategory === category && (
                      <div className="pl-6 py-2">
                        {selectedMember.projects[category].length > 0 ? (
                          selectedMember.projects[category].map((project) => (
                            <div key={project.id} className="flex justify-between items-center py-2">
                              <span className="text-gray-700">{project.name}</span>
                              <select
                                value={project.access}
                                onChange={(e) =>
                                  handleAccessChange(selectedMember.id, category, project.id, e.target.value)
                                }
                                className="p-1 border border-emerald-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="Edit">Edit</option>
                                <option value="Read">Read</option>
                                <option value="View">View</option>
                              </select>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-600 text-sm">No projects in this category</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'Efficiency' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Current Conservation Tasks</h3>
                  <div className="space-y-3">
                    {selectedMember.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex justify-between items-center bg-emerald-50 rounded-lg p-3"
                      >
                        <p className="text-gray-900">{task.title}</p>
                        <div className="flex items-center space-x-2">
                          {new Date(task.dueDate) < new Date('2025-07-17') &&
                            task.status !== 'Completed' && (
                              <span className="text-sm text-red-600">Overdue</span>
                            )}
                          <span
                            className={`text-sm font-medium ${
                              task.status === 'Completed'
                                ? 'text-green-600'
                                : task.status === 'In Progress'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedMember.tasks.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-900 font-medium">Task Completion</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-emerald-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              (selectedMember.tasks.filter((task) => task.status === 'Completed')
                                .length /
                                selectedMember.tasks.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round(
                          (selectedMember.tasks.filter((task) => task.status === 'Completed')
                            .length /
                            selectedMember.tasks.length) *
                            100
                        )}
                        % Complete
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Conservation Impact Over Time</h3>
                  <EfficiencyGraph data={selectedMember.efficiency} />
                  <p className="text-sm text-gray-600 mt-2">Efficiency (%) over the last 5 weeks</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Region of Operation</h3>
                  <p className="text-gray-600">{selectedMember.region}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}