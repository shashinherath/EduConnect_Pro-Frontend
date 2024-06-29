import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "./SearchContext";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import pdficon from "../assets/file_types/pdf-svgrepo-com.svg";
import wordicon from "../assets/file_types/word-svgrepo-com.svg";
import ppticon from "../assets/file_types/ppt-svgrepo-com.svg";
import pngicon from "../assets/file_types/png-svgrepo-com.svg";
import jpgicon from "../assets/file_types/jpg-svgrepo-com.svg";
import fileicon from "../assets/file_types/file-1-svgrepo-com.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

export default function Lec_Materials() {
  const materialCourseId = localStorage.getItem("materialCourseId");
  const materialCourseTitle = localStorage.getItem("materialCourseTitle");
  const { searchQuery } = useSearch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState("");

  const token = localStorage.getItem("token");
  const backendUrl = "http://127.0.0.1:8000";

  function handleFileChange(e) {
    const tempFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (tempFile.size > maxSize) {
      setShowAlert1(true);
      e.target.value = "";
    } else {
      setFile(e.target.files[0]);
    }
  }

  useEffect(() => {
    let timer;
    if (showAlert1) {
      timer = setTimeout(() => {
        setShowAlert1(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert1]);

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
  }, [refresh]);

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

  const handleDeleteDialog = (e) => {
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/lecture_material_detail/${materialId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefresh((prev) => !prev);
      setMaterialId("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (title !== "") {
        formData.append("title", title);
      }
      formData.append("description", description);
      formData.append("filename", filename);
      formData.append("course_id", materialCourseId);

      if (file !== null) {
        formData.append("file", file);
      }

      const response = await axios.post(
        `${backendUrl}/api/lecture_material_add`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setOpen(false);
      setRefresh((prev) => !prev);
      setTitle("");
      setDescription("");
      setFilename("");
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetMaterial = async (id) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/lecture_material_detail/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setFilename(response.data.filename);
      setFileLink(response.data.file);
      setOpen2(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMaterial = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (title !== "") {
        formData.append("title", title);
      }

      formData.append("description", description);
      formData.append("filename", filename);

      if (file !== null) {
        formData.append("file", file);
      }

      const response = await axios.put(
        `${backendUrl}/api/lecture_material_detail/${materialId}`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setOpen2(false);
      setRefresh((prev) => !prev);
      setMaterialId("");
      setTitle("");
      setDescription("");
      setFilename("");
      setFileLink("");
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setMaterialId("");
    setTitle("");
    setDescription("");
    setFilename("");
    setFileLink("");
    setFile(null);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-900 text-left">
        {materialCourseTitle}
      </h1>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mb-16">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900"></h1>
            <p className="mt-2 text-sm text-gray-700"></p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => {
                setOpen(true);
              }}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add material
            </button>
          </div>
        </div>

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
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                                onClick={() => {
                                  setMaterialId(material.id);
                                  handleGetMaterial(material.id);
                                }}
                              >
                                Edit
                                <span className="sr-only">, {material.id}</span>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                                onClick={() => {
                                  setMaterialId(material.id);
                                  handleDeleteDialog();
                                }}
                              >
                                Delete
                                <span className="sr-only">, {material.id}</span>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
        {/* open window 1 */}
        <Transition show={open}>
          <Dialog className="relative z-10" onClose={() => {}}>
            <TransitionChild
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <TransitionChild
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                      <TransitionChild
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => {
                              setOpen(false);
                              closeForm();
                            }}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </TransitionChild>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <DialogTitle className="text-base leading-6 text-gray-900">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Add a Material
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                          </DialogTitle>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <form method="POST">
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div className="sm:col-span-4">
                                    <label
                                      htmlFor="title"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Title
                                    </label>
                                    <div className="mt-2">
                                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                          type="text"
                                          name="title"
                                          id="title"
                                          value={title}
                                          onChange={(e) =>
                                            setTitle(e.target.value)
                                          }
                                          required
                                          autoComplete="title"
                                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                      htmlFor="photo"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Lecture Material (File size: 10MB max)
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                      <input
                                        className="w-full text-gray-400 font-semibold text-sm bg-white border ring-1 ring-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={(e) => {
                                          handleFileChange(e);
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-4">
                                    <label
                                      htmlFor="file-name"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      File Name
                                    </label>
                                    <div className="mt-2">
                                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                          type="text"
                                          name="file-name"
                                          id="file-name"
                                          value={filename}
                                          onChange={(e) =>
                                            setFilename(e.target.value)
                                          }
                                          required
                                          autoComplete="file-name"
                                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-span-full">
                                    <label
                                      for="about"
                                      class="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Description
                                    </label>
                                    <div class="mt-2">
                                      <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={description}
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                        required
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      ></textarea>
                                    </div>
                                    <p class="mt-3 text-sm leading-6 text-gray-600"></p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => {
                                  setOpen(false);
                                  closeForm();
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                onClick={handleAddMaterial}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Open window 2 */}
        <Transition show={open2}>
          <Dialog className="relative z-10" onClose={() => {}}>
            <TransitionChild
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <TransitionChild
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                      <TransitionChild
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => {
                              setOpen2(false);
                              closeForm();
                            }}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </TransitionChild>
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <DialogTitle className="text-base leading-6 text-gray-900">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Edit the Material
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                          </DialogTitle>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <form method="POST">
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div className="sm:col-span-4">
                                    <label
                                      htmlFor="title"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Title
                                    </label>
                                    <div className="mt-2">
                                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                          type="text"
                                          name="title"
                                          id="title"
                                          value={title}
                                          onChange={(e) =>
                                            setTitle(e.target.value)
                                          }
                                          required
                                          autoComplete="title"
                                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-span-full">
                                    <label
                                      htmlFor="material"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Lecture Material (File size: 10MB max)
                                    </label>
                                    <label
                                      htmlFor="file"
                                      className="w-full text-gray-400 font-semibold text-sm bg-white border ring-1 ring-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                    >
                                      {fileLink
                                        ? fileLink.split("/").pop()
                                        : ""}
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                      <input
                                        className="w-full text-gray-400 font-semibold text-sm bg-white border ring-1 ring-gray-300 file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                                        type="file"
                                        id="file"
                                        name="file"
                                        onChange={(e) => {
                                          handleFileChange(e);
                                        }}
                                      />
                                      <br />
                                    </div>
                                  </div>

                                  <div className="sm:col-span-4">
                                    <label
                                      htmlFor="file-name"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      File Name
                                    </label>
                                    <div className="mt-2">
                                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                        <input
                                          type="text"
                                          name="file-name"
                                          id="file-name"
                                          value={filename}
                                          onChange={(e) =>
                                            setFilename(e.target.value)
                                          }
                                          required
                                          autoComplete="file-name"
                                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-span-full">
                                    <label
                                      for="about"
                                      class="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Description
                                    </label>
                                    <div class="mt-2">
                                      <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={description}
                                        onChange={(e) =>
                                          setDescription(e.target.value)
                                        }
                                        required
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      ></textarea>
                                    </div>
                                    <p class="mt-3 text-sm leading-6 text-gray-600"></p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                onClick={() => {
                                  setOpen2(false);
                                  closeForm();
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                onClick={handleUpdateMaterial}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Dialog box */}
        <Transition show={openDialog}>
          <Dialog className="relative z-10" onClose={setOpenDialog}>
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <DialogTitle
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete material
                          </DialogTitle>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete your material? All
                              of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          setOpenDialog(false);
                          handleDelete();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpenDialog(false)}
                        data-autofocus
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
        <div>
          {showAlert1 && (
            <div
              className="rounded-md bg-yellow-50 p-4"
              style={{
                position: "fixed",
                top: 100,
                right: 500,
                left: 500,
                zIndex: 1000,
              }}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 text-left">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Attention needed
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 text-left">
                    <p>
                      Max File size should be less than 10MB. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
