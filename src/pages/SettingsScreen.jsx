import React from "react";
import { ShieldCheck, Mail, User } from "lucide-react";

const mockUser = {
  name: "Tanaka HC",
  email: "tanaka.hc@example.com",
  access: {
    Oceans: "Editor",
    Wildlife: "Viewer",
    Climate: "Owner",
    Land: "No Access",
    Food: "Editor",
    Water: "Viewer",
  },
};

export default function SettingsScreen() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-6">User Settings</h2>

        {/* Profile Info */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <div className="flex items-center bg-gray-100 border rounded px-3 py-2 text-gray-600">
            <User className="w-4 h-4 mr-2" />
            {mockUser.name}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Email Address</label>
          <div className="flex items-center bg-gray-100 border rounded px-3 py-2 text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {mockUser.email}
          </div>
        </div>

        {/* Access Levels */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Access Levels</label>
          <div className="space-y-3">
            {Object.entries(mockUser.access).map(([category, level]) => (
              <div
                key={category}
                className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded px-4 py-2"
              >
                <span className="font-medium">{category}</span>
                <div className="flex items-center text-sm text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  {level}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Options */}
        <div className="text-right text-sm text-gray-500 italic">
          Additional settings coming soon...
        </div>
      </div>
    </div>
  );
}
