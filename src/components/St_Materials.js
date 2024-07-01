import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "./SearchContext";
import { Link } from "react-router-dom";
import pdficon from "../assets/file_types/pdf-svgrepo-com.svg";
import wordicon from "../assets/file_types/word-svgrepo-com.svg";
import ppticon from "../assets/file_types/ppt-svgrepo-com.svg";
import pngicon from "../assets/file_types/png-svgrepo-com.svg";
import jpgicon from "../assets/file_types/jpg-svgrepo-com.svg";
import fileicon from "../assets/file_types/file-1-svgrepo-com.svg";

const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  const formattedTime =
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2);

  return `${formattedDate} at ${formattedTime}`;
};

export default function St_Materials() {
  const materialCourseId = localStorage.getItem("materialCourseId");
  const materialCourseTitle = localStorage.getItem("materialCourseTitle");
  const { searchQuery } = useSearch();
  const [materials, setMaterials] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [courseMaterials, setCourseMaterials] = useState([]);

  const token = localStorage.getItem("token");
  const backendUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/lecture_material_api`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAllMaterials(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCourseMaterials(
      allMaterials.filter((material) => {
        if (materialCourseId !== "") {
          return material.course_id == materialCourseId;
        } else {
          console.log("Course not set");
        }
      })
    );
  }, [allMaterials]);

  useEffect(() => {
    setMaterials(
      courseMaterials.filter((material) => {
        if (searchQuery === "") {
          return true;
        } else {
          return (
            material.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            material.filename?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      })
    );
  }, [searchQuery, courseMaterials]);

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-900 text-left">
        {materialCourseTitle}
      </h1>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className=" bg-white shadow sm:rounded-md mt-8">
          <ul role="list" className="divide-y divide-gray-100 px-10">
            {materials.map((material) => (
              <>
                {material.title ? (
                  <div className="flex items-center justify-center gap-x-3 pt-5">
                    <h1 className=" text-xl font-bold font leading-6 text-gray-900 text-center">
                      {material.title}
                    </h1>
                  </div>
                ) : null}

                <li
                  key={material.id}
                  className="flex items-center justify-between gap-x-6 py-5"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <img
                        className="h-8 w-8"
                        src={
                          material.file.split(".").pop() === "pdf"
                            ? pdficon
                            : material.file.split(".").pop() === "docx" ||
                              material.file.split(".").pop() === "doc"
                            ? wordicon
                            : material.file.split(".").pop() === "ppt" ||
                              material.file.split(".").pop() === "pptx"
                            ? ppticon
                            : material.file.split(".").pop() === "png"
                            ? pngicon
                            : material.file.split(".").pop() === "jpg" ||
                              material.file.split(".").pop() === "jpeg"
                            ? jpgicon
                            : fileicon
                        }
                        alt="file types"
                      />
                      <p className="font-semibold leading-6 text-gray-900 text-left">
                        {material.filename}
                      </p>
                    </div>
                    <div className="flex items-start gap-x-3">
                      <p className="font-normal leading-6 text-gray-600 text-left">
                        {material.description}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <svg
                        viewBox="0 0 2 2"
                        className="h-0.5 w-0.5 fill-current"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                      <p className="truncate">
                        Created by {formatDateAndTime(material.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <Link
                      to={backendUrl + material.file}
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      View {material.file.split(".").pop().toUpperCase()}
                      <span className="sr-only">, {material.id}</span>
                    </Link>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
