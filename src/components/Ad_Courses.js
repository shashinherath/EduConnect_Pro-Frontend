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
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "./SearchContext";
import { Link } from "react-router-dom";

export default function Ad_Students() {
  const { searchQuery } = useSearch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [degree, setDegree] = useState("ICT");
  const [image, setImage] = useState(null);
  const [imageUpdated, setImageUpdated] = useState(null);
  const default_img =
    process.env.REACT_APP_BACKEND_URL + "/media/course_images/default.png";

  const token = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const fileInputRef = React.useRef(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/course_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    setCourses(
      allCourses.filter((course) => {
        if (searchQuery === "") {
          return true;
        } else {
          return (
            course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            course.degree?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      })
    );
  }, [searchQuery, allCourses]);

  const handleDeleteDialog = (e) => {
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/course_detail/${courseId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefresh((prev) => !prev);
      setCourseId("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("degree", degree);

      if (image !== null) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendUrl}/api/course_add`,
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
      setName("");
      setDescription("");
      setDegree("ICT");
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetCourse = async (id) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/course_detail/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setDegree(response.data.degree);
      setImage(response.data.image);
      setOpen2(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("degree", degree);

      if (imageUpdated !== null) {
        formData.append("image", imageUpdated);
      }

      const response = await axios.put(
        `${backendUrl}/api/course_detail/${courseId}`,
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
      setName("");
      setDescription("");
      setDegree("ICT");
      setImage(null);
      setImageUpdated(null);
      setProfilePicUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setName("");
    setDescription("");
    setDegree("ICT");
    setImage(null);
    setImageUpdated(null);
    setProfilePicUrl("");
  };

  return (
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
            Add course
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
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
                class="select-none rounded-lg bg-indigo-600 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md"
              >
                {course.degree}
              </div>
            </div>
            <div class="p-6 pt-0">
              <Link
                className="text-indigo-600 hover:text-indigo-900 mr-5"
                onClick={() => {
                  setCourseId(course.id);
                  handleGetCourse(course.id);
                }}
              >
                Edit<span className="sr-only">, {course.name}</span>
              </Link>
              <Link
                className="text-red-600 hover:text-red-900 ml-5"
                onClick={() => {
                  setCourseId(course.id);
                  handleDeleteDialog();
                }}
              >
                Delete<span className="sr-only">, {course.name}</span>
              </Link>
            </div>
          </div>
        ))}
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
                            Add a Course
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form method="POST">
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="col-span-full">
                                <label
                                  htmlFor="photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                  {image ? (
                                    <img
                                      className="h-22 w-32"
                                      src={profilePicUrl}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="h-22 w-32"
                                      src={default_img}
                                      alt=""
                                    />
                                  )}

                                  {/* Hidden file input */}
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) => {
                                      setImage(e.target.files[0]);
                                      handleFileChange(e);
                                    }}
                                    style={{ display: "none" }}
                                    ref={fileInputRef} // Assuming you've defined this ref somewhere in your component
                                  />
                                  {/* Visible button that triggers file input */}
                                  <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={(e) => {
                                      fileInputRef.current.click(); // Trigger file input click
                                    }}
                                  >
                                    Choose
                                  </button>
                                </div>
                              </div>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Name
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                      <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        required
                                        autoComplete="name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="degree"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Degree
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="degree"
                                      name="degree"
                                      autoComplete="degree"
                                      value={degree}
                                      onChange={(e) =>
                                        setDegree(e.target.value)
                                      }
                                      required
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                      <option>ICT</option>
                                      <option>ET</option>
                                      <option>BST</option>
                                      <option>HR</option>
                                      <option>Art</option>
                                      <option>Management</option>
                                      <option>Mathematics</option>
                                    </select>
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
                              onClick={handleAddCourse}
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
                            Edit the Course
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form method="POST">
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="col-span-full">
                                <label
                                  htmlFor="photo"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                  {image ? (
                                    <img
                                      className="h-22 w-32"
                                      src={
                                        profilePicUrl !== ""
                                          ? profilePicUrl
                                          : backendUrl + image
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="h-22 w-32"
                                      src={default_img}
                                      alt=""
                                    />
                                  )}

                                  {/* Hidden file input */}
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) => {
                                      setImageUpdated(e.target.files[0]);
                                      handleFileChange(e);
                                    }}
                                    style={{ display: "none" }}
                                    ref={fileInputRef} // Assuming you've defined this ref somewhere in your component
                                  />
                                  {/* Visible button that triggers file input */}
                                  <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={(e) => {
                                      fileInputRef.current.click(); // Trigger file input click
                                    }}
                                  >
                                    Choose
                                  </button>
                                </div>
                              </div>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Name
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                      <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        required
                                        autoComplete="name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="degree"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Degree
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="degree"
                                      name="degree"
                                      autoComplete="degree"
                                      value={degree}
                                      onChange={(e) =>
                                        setDegree(e.target.value)
                                      }
                                      required
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                      <option>ICT</option>
                                      <option>ET</option>
                                      <option>BST</option>
                                      <option>HR</option>
                                      <option>Art</option>
                                      <option>Management</option>
                                      <option>Mathematics</option>
                                    </select>
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
                              onClick={handleUpdateCourse}
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
                          Delete course
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your course? All of
                            your data will be permanently removed. This action
                            cannot be undone.
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
    </div>
  );
}
