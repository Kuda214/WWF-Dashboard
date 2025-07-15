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

  return (
    <div className="h-[96vh] p-8 bg-gray-200 flex">
      {/* Left Panel */}
      <div className="w-1/3 max-w-sm bg-white rounded-lg shadow p-6 text-center">
        <img
          src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
          alt="Profile"
          className="mx-auto rounded-full w-36 h-36 mb-4 border-2 border-gray-300"
        />
        <h2 className="text-2xl font-semibold">Jane Smith</h2>
        <p className="text-gray-500 text-lg">Product Manager</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 ml-8 bg-white rounded-lg shadow p-6">
        {/* Tabs */}
        <div className="flex border-b mb-6 space-x-4 ">
          {['basic', 'password', 'access'].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-4 font-medium capitalize border-b-2 font-bold transition ${
                activeTab === tab
                  ? 'border-green-500 text-green-900'
                  : 'border-transparent text-gray-500 hover:text-green-900'
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
            <div>
              <label className="block mb-4">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  value="jane@example.com"
                  readOnly
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Phone</span>
                <input
                  type="tel"
                  value="+1 234 567 8901"
                  readOnly
                  className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </label>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Update Password
              </button>
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-4">
              {['admin', 'editor', 'viewer'].map((level) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="capitalize text-gray-700">{level}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={access[level]}
                      onChange={() => handleToggle(level)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-all relative">
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
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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
