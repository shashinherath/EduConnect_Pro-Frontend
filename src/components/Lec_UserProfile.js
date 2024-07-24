import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";

export default function Lec_UserProfile() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [degree, setDegree] = useState("");
  const [role, setRole] = useState("Lecturer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profile_pic, setProfile_pic] = useState("");
  const [profile_picUpdated, setProfile_picUpdated] = useState("");
  const [refresh, setRefresh] = useState(false);
  const fileInputRef = useRef(null);
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
        console.log(response.data);
        setUserId(response.data.id);
        setUsername(response.data.admin.username);
        setFirst_name(response.data.admin.first_name);
        setLast_name(response.data.admin.last_name);
        setDegree(response.data.degree);
        setRole(response.data.role);
        setEmail(response.data.admin.email);
        setProfile_pic(response.data.profile_pic);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("degree", degree);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("user_type", 1);

      if (password !== "") {
        formData.append("password", password);
      }

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
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div div className="flex flex-col items-center justify-center light m-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 text-left">
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
                        onChange={(e) => setUsername(e.target.value)}
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
                      onChange={(e) => setFirst_name(e.target.value)}
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
                      onChange={(e) => setLast_name(e.target.value)}
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
                      onChange={(e) => setDegree(e.target.value)}
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
                      onChange={(e) => setPassword(e.target.value)}
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
              onClick={() => {}}
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
  );
}
