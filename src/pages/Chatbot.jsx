import { useState, useRef, useEffect } from "react";
import {
  BotIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
  ClockIcon,
} from "lucide-react";
import React from "react";

const navItems = [
  { name: "WWF Assistant", icon: BotIcon, key: "assistant" },
  { name: "Templates", icon: FileTextIcon, key: "templates" },
  { name: "Stats", icon: BarChartIcon, key: "stats" },
  { name: "Settings", icon: SettingsIcon, key: "settings" },
  { name: "History", icon: ClockIcon, key: "history" },
];

export default function WwfAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me anything about projects, setup, or documentation.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [activeTab, setActiveTab] = useState("assistant");

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

  return (
    <div className="h-[94vh] w-full bg-gray-100 font-sans flex flex-col">
      {/* Top Navigation */}
      <header className="bg-gray-500 shadow-sm px-6 py-4 border-b border-gray-200 flex items-center gap-6 text-white">
        <div>
        <h1 className="text-xl font-bold text-white">WWF Console</h1>
        </div>

        <div>
        <nav className="flex gap-4 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
                  activeTab === item.key
                    ? "bg-green-100 text-green-700"
                    : "text-white hover:text-green-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </button>
            );
          })}
        </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex  overflow-hidden h-[86vh]">
        <section className="flex-1 p-6 bg-white rounded-t-lg shadow-inner overflow-y-auto">
          <h2 className="text-md font-semibold text-gray-800 mb-4">
            {navItems.find((i) => i.key === activeTab)?.name}
          </h2>

          <div className="flex flex-col h-[75vh] bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-lg px-4 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-green-600 text-white"
                      : "mr-auto bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4 rounded-b-lg">
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
                className="w-full resize-none p-3 rounded-md border border-gray-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <div className="text-right mt-2">
                <button
                  onClick={handleSend}
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar (Recent Topics) */}
        <aside className="w-72 p-6 bg-gray-50 border-l border-gray-300 hidden lg:block">
          <div className="text-sm font-bold text-gray-700 mb-2">
            Recent Topics
          </div>
          <ul className="space-y-2 text-sm font-medium text-gray-800">
            <li className="hover:underline text-blue-500 cursor-pointer">
              How to load a project?
            </li>
            <li className="hover:underline text-blue-500 cursor-pointer">
              Who manages the updates?
            </li>
            <li className="hover:underline text-blue-500 cursor-pointer">
              Where to find project templates?
            </li>
            <li className="hover:underline text-blue-500 cursor-pointer">
              Steps to request deployment?
            </li>
          </ul>
        </aside>
      </main>
    </div>
  );
}
