import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EduAI_logo from "../assets/logo/Owl only Transparant.png";

export default function St_AI() {
  const containerRef = useRef(null);
  const [currentUser, setCurrentUser] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [waitingMessage, setWaitingMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const token = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

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

    setWaitingMessage(message);

    const formdata = new FormData();

    formdata.append("message", message);
    formdata.append("student_id", currentUser.id);

    setMessage("");

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
      setWaitingMessage("");
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
  }, [chatHistory, waitingMessage]);

  const CodeBlock = ({ children }) => (
    <pre className="bg-gray-700 p-2 rounded text-white overflow-x-auto my-2">
      <code>{children}</code>
    </pre>
  );

  const checkAccess = async () => {
    try {
      const response = await fetch("https://platform.openai.com", {
        method: "GET",
        mode: "no-cors",
      });
      if (response) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkAccess();
    const interval = setInterval(checkAccess, 5000);
    return () => clearInterval(interval);
  }, []);

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
              <div className="chat-message self-end bg-blue-500 text-white max-w-3xl rounded-lg px-3 py-1.5 text-md text-left my-2">
                {chat.message}
              </div>
              <div className="chat-message self-start bg-gray-300 text-gray-800 max-w-3xl rounded-lg px-3 py-1.5 text-md text-left my-2">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                    link: ({ node, ...props }) => (
                      <a className="text-blue-500 hover:underline" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <table
                        className="min-w-full divide-y divide-gray-200"
                        {...props}
                      />
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-gray-100" {...props} />
                    ),
                    tbody: ({ node, ...props }) => (
                      <tbody
                        className="bg-white divide-y divide-gray-300"
                        {...props}
                      />
                    ),
                    tr: ({ node, ...props }) => <tr {...props} />,
                    th: ({ node, ...props }) => (
                      <th
                        className="px-6 py-3 text-left font-medium tracking-wider border-r border-gray-300"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap border-r border-gray-300"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-1" {...props} />
                    ),
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-semibold mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-semibold mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-semibold mb-2" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4 className="text-md font-semibold mb-2" {...props} />
                    ),
                    h5: ({ node, ...props }) => (
                      <h5 className="text-sm font-semibold mb-2" {...props} />
                    ),
                    h6: ({ node, ...props }) => (
                      <h6 className="text-xs font-semibold mb-2" {...props} />
                    ),
                    code: ({ node, inline, className, children, ...props }) => {
                      const isInline = inline;
                      const language = className
                        ? className.replace("language-", "")
                        : "";
                      return isInline ? (
                        <code {...props}>{children}</code>
                      ) : (
                        <CodeBlock {...props}>{children}</CodeBlock>
                      );
                    },
                  }}
                >
                  {chat.response}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {waitingMessage && (
            <div className="flex flex-col">
              <div className="chat-message self-end bg-blue-500 text-white max-w-3xl rounded-lg px-3 py-1.5 text-md text-left my-2">
                {waitingMessage}
              </div>
              <div className="chat-message self-start bg-gray-300 text-gray-800 max-w-3xl rounded-lg px-3 py-1.5 text-md text-left my-2">
                <div className="text-center mx-auto">
                  <span className="inline-block w-2 h-2 rounded-full mr-1 bg-gray-800 animate-wave1"></span>
                  <span className="inline-block w-2 h-2 rounded-full mr-1 bg-gray-800 animate-wave2"></span>
                  <span className="inline-block w-2 h-2 rounded-full mr-1 bg-gray-800 animate-wave3"></span>
                  <span className="inline-block">EduAI is typing...</span>
                </div>
              </div>
            </div>
          )}
          {waitingMessage.trim() !== "" ||
            (chatHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="flex items-center space-x-2">
                  <img
                    src={EduAI_logo}
                    alt="EduAI Logo"
                    className="h-8 w-8 filter grayscale"
                  />
                  <h1 className="text-3xl font-extrabold">EduAI</h1>
                </div>
                <p className="font-bold"> powered by OpenAI</p>
                <p className="mt-3">
                  Explore knowledge by interacting with our AI chat box below.
                </p>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
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
