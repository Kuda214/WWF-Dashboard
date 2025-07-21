import React, { useState } from "react";

const generateTicketNumber = () => {
  return `SUP-${Math.floor(100000 + Math.random() * 900000)}`;
};


const SupportScreen = () => {
  const sampleTickets = [
        {
            id: "SUP-245812",
            request: "Unable to upload project files to the portal.",
            createdAt: new Date("2025-07-18T09:30:00"),
            status: "Open",
        },
        {
            id: "SUP-193744",
            request: "Dashboard layout bug on mobile view has been fixed.",
            createdAt: new Date("2025-07-14T14:10:00"),
            status: "Resolved",
        },
    ];


  const [tickets, setTickets] = useState(sampleTickets);
  const [newRequest, setNewRequest] = useState("");

  const handleSubmit = () => {
    if (!newRequest.trim()) return;

    const newTicket = {
      id: generateTicketNumber(),
      request: newRequest.trim(),
      createdAt: new Date(),
      status: "Open",
    };
    setTickets((prev) => [newTicket, ...prev]);
    setNewRequest("");
  };

  const toggleResolved = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: ticket.status === "Open" ? "Resolved" : "Open" }
          : ticket
      )
    );
  };

 

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Support Center</h1>

        {/* New Ticket Form */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="supportRequest">
            Describe your issue or request
          </label>
          <textarea
            id="supportRequest"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your support request here..."
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={!newRequest.trim()}
            className={`mt-3 px-6 py-2 rounded-lg font-semibold text-white ${
              newRequest.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
          >
            Submit Request
          </button>
        </div>

        {/* Tickets List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Previous Requests</h2>
          {tickets.length === 0 ? (
            <p className="text-gray-600">No support requests submitted yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[400px] overflow-y-auto">
              {tickets.map(({ id, request, createdAt, status }) => (
                <li
                  key={id}
                  className="border border-gray-300 rounded-md p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between"
                >
                  <div className="flex-1 mb-3 sm:mb-0">
                    <p className="font-semibold text-indigo-700">{id}</p>
                    <p className="text-gray-900">{request}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Submitted on {createdAt.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        status === "Open"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {status}
                    </span>
                    {status === "Open" && (
                      <button
                        onClick={() => toggleResolved(id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;
