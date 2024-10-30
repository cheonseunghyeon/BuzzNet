"use client";
import React, { useState } from "react";
import messages from "@/mock/messages.json";
import users from "@/mock/user.json";

const MessageList = () => {
  const [currentUser] = useState(users[0]);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <div className="max-w-6xl pt-4 mx-auto">
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h2 className="text-xl font-bold mb-4">Chat Room</h2>

        {messages.map(message => {
          const isCurrentUser = currentUser.id === message.senderId;

          return (
            <div key={message.id} className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
        <img src={currentUser.profileImage} alt={currentUser.name} className="w-10 h-10 rounded-full" />

        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageList;
