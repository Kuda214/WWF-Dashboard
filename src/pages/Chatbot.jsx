import { useState, useRef, useEffect } from "react";
import React from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg = { role: "user", text: input };
    const botReply = { role: "bot", text: `You said: "${input}"` };

    setMessages((prev) => [...prev, newUserMsg, botReply]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[94vh] flex flex-col bg-white text-white">
      <header className="p-4 text-lg font-bold bg-gray-700 shadow-md">WWF Chat Assistant</header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xl px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "ml-auto bg-green-600 text-white"
                : "mr-auto bg-gray-700 text-gray-100"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-gray-700 bg-gray-900 p-4">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full resize-none p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSend}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md float-right"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
