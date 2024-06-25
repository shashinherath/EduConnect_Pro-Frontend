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

export default function Ad_Lecturers() {
  const { searchQuery } = useSearch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [people, setPeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [userId, setuserId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("Lecturer");
  const [profile_pic, setProfile_pic] = useState(null);
  const [profile_picUpdated, setProfile_picUpdated] = useState(null);

  const token = localStorage.getItem("token");
  const backendUrl = "http://127.0.0.1:8000";
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
        const response = await axios.get(`${backendUrl}/api/lecturer_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllPeople(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    setPeople(
      allPeople.filter((person) => {
        if (searchQuery === "") {
          return true;
        } else {
          return (
            person.admin.first_name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            person.admin.last_name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            person.admin.email
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }
      })
    );
  }, [searchQuery, allPeople]);

  const handleDeleteDialog = (e) => {
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/lecturer_detail/${userId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefresh((prev) => !prev);
      setuserId("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("user_type", 2);
      formData.append("phone_number", phone_number);
      formData.append("role", role);

      if (profile_pic !== null) {
        formData.append("profile_pic", profile_pic);
      }

      const response = await axios.post(
        `${backendUrl}/api/lecturer_add`,
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
      setUsername("");
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setPassword("");
      setProfile_pic("");
      setPhone_number("");
      setRole("Lecturer");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUser = async (id) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/lecturer_detail/${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setUsername(response.data.admin.username);
      setFirst_name(response.data.admin.first_name);
      setLast_name(response.data.admin.last_name);
      setEmail(response.data.admin.email);
      setPassword(response.data.admin.password);
      setProfile_pic(response.data.profile_pic);
      setPhone_number(response.data.phone_number);
      setRole(response.data.role);
      setOpen2(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("user_type", 1);
      formData.append("phone_number", phone_number);
      formData.append("role", role);

      if (profile_picUpdated !== null) {
        formData.append("profile_pic", profile_picUpdated);
      }

      const response = await axios.put(
        `${backendUrl}/api/lecturer_detail/${userId}`,
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
      setUsername("");
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setPassword("");
      setProfile_pic(null);
      setProfile_picUpdated(null);
      setPhone_number("");
      setRole("Lecturer");
      setProfilePicUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setUsername("");
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPassword("");
    setProfile_pic(null);
    setProfile_picUpdated(null);
    setPhone_number("");
    setRole("Lecturer");
    setProfilePicUrl("");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
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
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={backendUrl + person.profile_pic}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 text-left">
                              {person.admin.first_name} {person.admin.last_name}
                            </div>
                            <div className="text-gray-500 text-left">
                              {person.admin.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <div className="text-gray-900">
                          {person.admin.username}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {person.phone_number}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                         
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            setuserId(person.id);
                            handleGetUser(person.id);
                          }}
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                         
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setuserId(person.id);
                            handleDeleteDialog();
                          }}
                        >
                          Delete<span className="sr-only">, {person.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                            Add a Lecturer
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
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
                                  {profile_pic ? (
                                    <img
                                      className="h-20 w-20 rounded-full"
                                      src={profilePicUrl}
                                      alt=""
                                    />
                                  ) : (
                                    <UserCircleIcon
                                      className="h-20 w-20 text-gray-300"
                                      aria-hidden="true"
                                    />
                                  )}

                                  {/* Hidden file input */}
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) => {
                                      setProfile_pic(e.target.files[0]);
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
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Username
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                        educonnectpro.com/
                                      </span>
                                      <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={(e) =>
                                          setUsername(e.target.value)
                                        }
                                        required
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    First name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      value={first_name}
                                      onChange={(e) =>
                                        setFirst_name(e.target.value)
                                      }
                                      required
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Last name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="last-name"
                                      id="last-name"
                                      value={last_name}
                                      onChange={(e) =>
                                        setLast_name(e.target.value)
                                      }
                                      required
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="role"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Role
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="role"
                                      name="role"
                                      autoComplete="role"
                                      value={role}
                                      onChange={(e) => setRole(e.target.value)}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                      <option>Lecturer</option>
                                      <option>Sr.Lecturer</option>
                                      <option>Professor</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="phone-number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="phone-number"
                                      id="phone-number"
                                      value={phone_number}
                                      onChange={(e) =>
                                        setPhone_number(e.target.value)
                                      }
                                      required
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      required
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Password
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="password"
                                      name="pasword"
                                      type="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      required
                                      autoComplete="password"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
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
                              onClick={handleAddUser}
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
                            Edit the Lecturer
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
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
                                  {profile_pic ? (
                                    <img
                                      className="h-20 w-20 rounded-full"
                                      src={
                                        profilePicUrl !== ""
                                          ? profilePicUrl
                                          : backendUrl + profile_pic
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <UserCircleIcon
                                      className="h-20 w-20 text-gray-300"
                                      aria-hidden="true"
                                    />
                                  )}

                                  {/* Hidden file input */}
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) => {
                                      setProfile_picUpdated(e.target.files[0]);
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
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Username
                                  </label>
                                  <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                        educonnectpro.com/
                                      </span>
                                      <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={(e) =>
                                          setUsername(e.target.value)
                                        }
                                        required
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    First name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      value={first_name}
                                      onChange={(e) =>
                                        setFirst_name(e.target.value)
                                      }
                                      required
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Last name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="last-name"
                                      id="last-name"
                                      value={last_name}
                                      onChange={(e) =>
                                        setLast_name(e.target.value)
                                      }
                                      required
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="role"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Role
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="role"
                                      name="role"
                                      autoComplete="role"
                                      value={role}
                                      onChange={(e) => setRole(e.target.value)}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                      <option>Lecturer</option>
                                      <option>Sr.Lecturer</option>
                                      <option>Professor</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="phone-number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="phone-number"
                                      id="phone-number"
                                      value={phone_number}
                                      onChange={(e) =>
                                        setPhone_number(e.target.value)
                                      }
                                      required
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="email"
                                      name="email"
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      required
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Password
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      id="password"
                                      name="pasword"
                                      type="password"
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                      required
                                      autoComplete="password"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
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
                              onClick={handleUpdateUser}
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
                          Deactivate account
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
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
                      Deactivate
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
