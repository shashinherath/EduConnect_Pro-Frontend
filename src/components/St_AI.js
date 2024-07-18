import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function St_AI() {
  const containerRef = useRef(null);
  const [currentUser, setCurrentUser] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const token = localStorage.getItem("token");
  const backendUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/current_user`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentUser.id) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/eduai_api/${currentUser.id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log(response.data);
        setChatHistory(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const formdata = new FormData();

    formdata.append("message", message);
    formdata.append("student_id", currentUser.id);

    try {
      const response = await axios.post(
        `${backendUrl}/api/eduai_add`,
        formdata,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setChatHistory([...chatHistory, response.data]);
      setMessage("");
    } catch (error) {
      console.error("There was an error sending the message!", error);
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
      <div className="flex flex-col h-[500px] w-auto">
        <div className="px-4 py-3 border-b border-gray-300">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              AI Knowledge Gathering System
            </h2>
            {isOnline ? (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Online
              </div>
            ) : (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Offline
              </div>
            )}
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex-1 p-3 overflow-y-auto space-y-2"
          id="chatDisplay"
        >
          {chatHistory.map((chat, index) => (
            <div key={index} className="flex flex-col">
              <div className="chat-message self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm text-left">
                {chat.message}
              </div>
              <div className="chat-message self-start bg-gray-300 text-gray-800 max-w-xs rounded-lg px-3 py-1.5 text-sm text-left">
                {chat.response.split("\n").map((line, index) => (
                  <p className="mb-2" key={index}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-3 py-2 border-t border-gray-300">
          <div className="flex gap-2">
            <input
              placeholder="Type what you want to know..."
              className="flex-1 p-2 border rounded-lg bg-gray-100 text-gray-800 text-sm"
              id="chatInput"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
              id="sendButton"
              onClick={handleSendMessage}
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
