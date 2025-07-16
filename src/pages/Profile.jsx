import { useState } from 'react';
import React from 'react';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('basic');
  const [access, setAccess] = useState({
    admin: false,
    editor: true,
    viewer: true,
  });

  const handleToggle = (key) => {
    setAccess({ ...access, [key]: !access[key] });
  };

  const handleSave = () => {
    console.log('Saved access levels:', access);
    alert('Access levels saved.');
  };

  // Sample team members data
  const teamMembers = [
    { name: 'John Doe', title: 'Developer', avatar: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' },
    { name: 'Alice Brown', title: 'Designer', avatar: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' },
    { name: 'Mark Wilson', title: 'Analyst', avatar: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex">
      {/* Left Panel */}
      <div className="w-1/3 max-w-sm bg-white rounded-xl shadow-lg p-6 text-center">
        <img
          src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
          alt="Profile"
          className="mx-auto rounded-full w-36 h-36 mb-4 border-2 border-gray-300 object-cover"
        />
        <h2 className="text-2xl font-semibold text-gray-900">Jane Smith</h2>
        <p className="text-gray-900 text-lg">Product Manager</p>
        <div className="mt-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Team Members</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                <img
                  src={member.avatar}
                  alt={`${member.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div className="text-left">
                  <p className="text-gray-900 font-medium">{member.name}</p>
                  <p className="text-gray-900 text-sm">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 ml-8 bg-white rounded-xl shadow-lg p-8">
        {/* Tabs */}
        <div className="flex border-b mb-8 space-x-6">
          {['basic', 'password', 'access'].map((tab) => (
            <button
              key={tab}
              className={`pb-3 px-4 font-medium capitalize text-gray-900 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-indigo-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'basic' && 'Basic Info'}
              {tab === 'password' && 'Password'}
              {tab === 'access' && 'Access Level'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-900 font-medium">Email</span>
                <input
                  type="email"
                  value="jane@example.com"
                  readOnly
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="text-gray-900 font-medium">Phone</span>
                <input
                  type="tel"
                  value="+1 234 567 8901"
                  readOnly
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none"
                />
              </label>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-900 font-medium">Current Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-medium">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-medium">Confirm New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Update Password
              </button>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-6">
              {['admin', 'editor', 'viewer'].map((level) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="capitalize text-gray-900 font-medium">{level}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={access[level]}
                      onChange={() => handleToggle(level)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-all relative">
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          access[level] ? 'translate-x-5' : ''
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
              ))}
              <button
                onClick={handleSave}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Access
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}