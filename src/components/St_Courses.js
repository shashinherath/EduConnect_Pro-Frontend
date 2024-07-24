import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "./SearchContext";
import { useNavigate } from "react-router-dom";

export default function St_Courses() {
  const { searchQuery } = useSearch();
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [degree, setDegree] = useState("");
  const [degreeCourses, setDegreeCourses] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${backendUrl}/api/current_user`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setDegree(response1.data.degree);

        const response = await axios.get(`${backendUrl}/api/course_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllCourses(response.data);
        localStorage.setItem("materialCourseId", "");
        localStorage.setItem("materialCourseTitle", "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setDegreeCourses(
      allCourses.filter((course) => {
        if (degree !== "") {
          return course.degree === degree;
        } else {
          console.log("Degree not set");
        }
      })
    );
  }, [allCourses]);

  useEffect(() => {
    setCourses(
      degreeCourses.filter((course) => {
        if (searchQuery === "") {
          return true;
        } else {
          return (
            course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
      })
    );
  }, [searchQuery, degreeCourses]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-20 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <Link
            to=""
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem("materialCourseId", course.id);
              localStorage.setItem("materialCourseTitle", course.name);
              navigate("/student/dashboard/courses/materials");
            }}
            key={course.id}
            className="hover:shadow-lg hover:shadow-gray-500/40 focus:shadow-lg focus:shadow-gray-500/40 active:shadow-lg active:shadow-gray-500/40 transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:-translate-y-1 active:-translate-y-1 hover:scale-105 focus:scale-105 active:scale-105"
          >
            <div class="relative flex w-60 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
              <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img
                  className="h-full w-full"
                  src={backendUrl + course.image}
                  alt=""
                />
              </div>
              <div class="p-6">
                <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {course.name}
                </h5>
                <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {course.description}
                </p>
              </div>
              <div class="p-6 pt-0">
                <div
                  data-ripple-light="true"
                  type="button"
                  class="select-none rounded-lg bg-indigo-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md"
                >
                  {course.degree}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
