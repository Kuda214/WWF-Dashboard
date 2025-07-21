import { useState, useRef, useEffect } from "react";
import {
  BotIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
} from "lucide-react";
import React from "react";

const navItems = [
  { name: "Chat", icon: BotIcon, key: "assistant" },
  { name: "Workflow", icon: FileTextIcon, key: "templates" },
  { name: "OpenData", icon: BarChartIcon, key: "stats" },
  // { name: "Settings", icon: SettingsIcon, key: "settings" },
];

const dataSources = ["Project Data", "Environmental Reports", "Wildlife Logs"];
const tableSample = [
  ["ID", "Name", "Status"],
  ["001", "Habitat Survey", "Complete"],
  ["002", "Climate Check", "In Progress"],
];

export default function WwfAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me anything about projects, setup, or documentation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("assistant");
  const [selectedSource, setSelectedSource] = useState(dataSources[0]);

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg = { role: "user", text: input };
    const botReply = { role: "bot", text: `I noted: "${input}"` };
    setMessages((prev) => [...prev, newUserMsg, botReply]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderChatSection = () => (
    <div className="flex-1 flex flex-col  border border-gray-300 h-[80vh] rounded">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 ">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-lg px-4 py-2 rounded-lg text-sm ${
              msg.role === "user"
                ? "ml-auto bg-green-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-white p-4">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask something like 'How do I load a project?'"
          className="w-full resize-none p-3 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="text-right mt-2">
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[94vh] w-full bg-gray-50 font-sans flex flex-col">
      {/* Top Nav */}
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-300 flex items-center justify-between text-white">
        <h1 className="text-2xl font-semibold">Panda</h1>
        <nav className="flex gap-4 text-sm font-medium">
          {navItems.map(({ name, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === key
                  ? "bg-green-100 text-green-800"
                  : "text-white hover:text-green-500 hover:bg-gray-200"
              }`}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex h-[86vh]">
        {activeTab === "assistant" && (
          <>
            <section className="flex-1 p-6 bg-white">{renderChatSection()}</section>
            <aside className="w-72 p-6 bg-gray-50 border-l border-gray-300 hidden lg:block overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">FAQ</h3>
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:outline-none shadow-sm"
              />
              <ul className="space-y-2 text-sm text-blue-600">
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
              </ul>
            </aside>
          </>
        )}

        {activeTab === "templates" && (
        <div className="flex h-[86vh] w-full">
          <section className="w-[25vw] p-4 border-r border-gray-200 bg-white">
            {renderChatSection()}
          </section>
          <section className="w-[45vw] p-6 bg-white flex flex-col">
            
            <div className="flex-1 border rounded-lg shadow-sm overflow-hidden">
              <iframe
                title="Sample Report"
                className="w-full h-full border-0"
                src="/temp.pdf"
              ></iframe>
            </div>
            <div className="mt-4 float-right">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Download Report
              </button>
            </div>
          </section>

          <aside className="w-[20vw] p-6 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Templates</h3>
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:outline-none shadow-sm"
              />

            <ul className="space-y-2 h-[20vh]">
              {[...Array(7)].map((_, i) => (
                <li
                  key={i}
                  className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm border hover:bg-gray-50 transition"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm mr-2 flex-shrink-0">
                    <img
                      src={`/assets/out1.png`}
                      alt={`Outcome ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Outcome {i + 1}</p>
                </li>
              ))}

              <div className="text-center text-gray-500 text-sm mt-2 border border-gray-200 h-[24vh]">
                <div className="h-[2vh] text-gray-300 w-full bg-blue-200">
                  <p className="py-4">Number Of API Request for the day</p>
                </div>
              </div>
            </ul>
              

          </aside>
        </div>
      )}

        {activeTab === "stats" && (
          <>
            <section className="flex-1 bg-white p-6 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Preview Report</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Download Report
                </button>
              </div>
            
              <h3 className="font-semibold text-gray-700 mb-4">
                {selectedSource} Table
              </h3>
              <table className="w-full bg-white border text-sm shadow-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    {tableSample[0].map((head, i) => (
                      <th key={i} className="px-3 py-2 border">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableSample.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-gray-50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 border">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <aside className="w-[20vw] bg-gray-50 border-l border-gray-200 p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Data Sources</h3>
              <ul className="space-y-2 text-sm">
                {dataSources.map((src) => (
                  <li
                    key={src}
                    onClick={() => setSelectedSource(src)}
                    className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-green-100 ${
                      selectedSource === src ? "bg-green-100 text-green-800" : ""
                    }`}
                  >
                    {src}
                  </li>
                ))}
              </ul>
            </aside>
          </>
        )}

        {activeTab === "settings" && (
          <section className="p-6">
            <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
            <p className="mt-4 text-sm text-gray-600">Coming soon...</p>
          </section>
        )}
      </main>
    </div>
  );
}