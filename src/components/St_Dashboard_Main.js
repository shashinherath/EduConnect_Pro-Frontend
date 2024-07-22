import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSearch } from "./SearchContext";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleLeftIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function St_Dashboard_Main() {
  const colorCodeClasses = {
    1: "bg-green-50 text-green-700 text-green-800",
    2: "bg-red-50 text-red-700 text-red-800",
    3: "bg-yellow-50 text-yellow-700 text-yellow-800",
    4: "bg-blue-50 text-blue-700 text-blue-800",
  };

  const dashCard = [
    {
      name: "Courses",
      icon: InboxIcon,
      href: "/student/dashboard/courses",
      members: 16,
      bgColor: "bg-pink-600",
    },
    {
      name: "EduAI",
      icon: SparklesIcon,
      href: "/student/dashboard/ai",
      members: 12,
      bgColor: "bg-purple-600",
    },
    {
      name: "Message",
      icon: ChatBubbleLeftIcon,
      href: "/student/dashboard/message",
      members: 16,
      bgColor: "bg-yellow-500",
    },
    {
      name: "Results",
      icon: ClipboardDocumentListIcon,
      href: "/student/dashboard/results",
      members: 8,
      bgColor: "bg-green-500",
    },
  ];

  const { searchQuery } = useSearch();
  const [currentDegree, setCurrentDegree] = useState("");
  const [degreeAnnouncements, setDegreeAnnouncements] = useState([]);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

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
        console.log(response.data);
        setCurrentDegree(response.data.degree);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/announcement_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentDegree]);

  useEffect(() => {
    setDegreeAnnouncements(
      allAnnouncements.filter(
        (announcement) => announcement.lecturer_details.degree === currentDegree
      )
    );
  }, [allAnnouncements]);

  useEffect(() => {
    setAnnouncements(
      degreeAnnouncements.filter((announcement) => {
        if (searchQuery === "") {
          return true;
        } else {
          return (
            announcement.title
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.message
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.lecturer_details.admin.first_name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.lecturer_details.admin.last_name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            announcement.lecturer_details.role
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
      })
    );
  }, [degreeAnnouncements, searchQuery]);

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-4">
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {dashCard.map((card) => (
          <Link to={card.href} className="hover:animate-bounce">
            <li
              key={card.name}
              className="col-span-1 flex rounded-md shadow-sm text-left"
            >
              <div
                className={`flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white ${card.bgColor} py-5`}
              >
                <card.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <p className="font-medium text-gray-900">{card.name}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <h1 className="m-2 text-2xl text-left font-bold text-gray-500">
        All announcements
      </h1>
      {announcements.map((announcement) => (
        <div
          className={`rounded-md ${
            colorCodeClasses[announcement.color_code].split(" ")[0]
          } p-4 text-left`}
        >
          <div className="flex-shrink-0">
            <div className="flex">
              <img
                className="h-10 w-10 rounded-full flex-shrink-0 -ml-2 -mt-2"
                src={backendUrl + announcement.lecturer_details.profile_pic}
                alt="Lecture Pic"
              />
              <h2
                className={`ml-2 -mt-2 font-extrabold ${
                  colorCodeClasses[announcement.color_code].split(" ")[1]
                }`}
              >
                {announcement.lecturer_details.role}{" "}
                {announcement.lecturer_details.admin.first_name}{" "}
                {announcement.lecturer_details.admin.last_name}
              </h2>
            </div>
            <div className="ml-10">
              <h3
                className={`text-sm font-medium ${
                  colorCodeClasses[announcement.color_code].split(" ")[2]
                }`}
              >
                {announcement.title}
              </h3>
              <div
                className={`mt-2 text-sm ${
                  colorCodeClasses[announcement.color_code].split(" ")[1]
                }`}
              >
                <p>{announcement.message}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
