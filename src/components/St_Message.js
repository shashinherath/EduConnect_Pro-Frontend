import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message_logo from "../assets/logo/Owl only Transparant.png";

export default function St_Message() {
  const containerRef = useRef(null);
  const [lecturers, setLecturers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [filteredChatHistory, setFilteredChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});

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

        const response2 = await axios.get(`${backendUrl}/api/lecturer_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLecturers(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLecturerClick = async (lecturer) => {
    setSelectedLecturer(lecturer);
    try {
      const response = await axios.get(
        `${backendUrl}/api/chat_api_student/${currentUser.id}`,
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

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const formdata = new FormData();

    formdata.append("message", message);
    formdata.append("lecturer_id", selectedLecturer.id);
    formdata.append("student_id", currentUser.id);
    formdata.append("sender_id", currentUser.id);

    try {
      const response = await axios.post(
        `${backendUrl}/api/chat_add`,
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

  useEffect(() => {
    setFilteredChatHistory(
      chatHistory.filter((chat) => chat.lecturer_id == selectedLecturer.id)
    );
  }, [chatHistory, selectedLecturer]);

  const filteredLecturers = lecturers.filter((lecturer) => {
    if (searchTerm === "") return true;
    else
      return (
        lecturer.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.admin.first_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        lecturer.admin.last_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  });

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredChatHistory]);

  return (
    <div className="container mx-auto bg-white rounded-lg mt-4">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>

          <ul className="overflow-auto h-[25rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600 text-left font-extrabold">
              Chats
            </h2>
            {filteredLecturers.map((lecturer) => (
              <li key={lecturer.id}>
                <a
                  className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-orange-100 focus:outline-none 
                    ${
                      selectedLecturer && selectedLecturer.id == lecturer.id
                        ? "bg-orange-200"
                        : ""
                    }`}
                  onClick={() => handleLecturerClick(lecturer)}
                >
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={backendUrl + lecturer.profile_pic}
                    alt="Profile Picture"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      <span className="block ml-2 font-semibold text-gray-600">
                        {lecturer.role} {lecturer.admin.first_name}{" "}
                        {lecturer.admin.last_name}{" "}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:col-span-2 lg:block">
          {selectedLecturer ? (
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={backendUrl + selectedLecturer.profile_pic}
                  alt="Profile Picture"
                />
                <span className="block ml-2 font-bold text-gray-600">
                  {selectedLecturer.role} {selectedLecturer.admin.first_name}{" "}
                  {selectedLecturer.admin.last_name}{" "}
                </span>
              </div>
              <div
                ref={containerRef}
                className="relative w-full p-6 overflow-y-auto h-[24rem]"
              >
                <ul className="space-y-2">
                  {filteredChatHistory.map((chat) => (
                    <li
                      key={chat.id}
                      className={`flex ${
                        chat.sender_id == currentUser.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`relative max-w-xl px-4 py-2 text-gray-700 ${
                          chat.sender_id == currentUser.id
                            ? "bg-blue-200"
                            : "bg-orange-200"
                        } rounded shadow`}
                      >
                        <span className="block text-left">{chat.message}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  required
                />
                <button type="button" onClick={handleSendMessage}>
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-col w-full h-[24rem] flex items-center justify-center text-gray-500">
              <img
                src={Message_logo}
                alt="Message Logo"
                className="h-10 w-10 filter grayscale"
              />
              <p className="font-bold">Message</p>
              <p className="mt-2">Select a lecturer to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
