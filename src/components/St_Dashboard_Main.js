import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSearch } from "./SearchContext";

export default function St_Dashboard_Main() {
  const colorCodeClasses = {
    1: "bg-green-50 text-green-700 text-green-800",
    2: "bg-red-50 text-red-700 text-red-800",
    3: "bg-yellow-50 text-yellow-700 text-yellow-800",
    4: "bg-blue-50 text-blue-700 text-blue-800",
  };
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
