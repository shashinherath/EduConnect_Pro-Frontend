import { Fragment, useState } from "react";
import {
  Listbox,
  Transition,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import {
  UserCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const labels = [
  { name: "Green", value: 1 },
  { name: "Red", value: 2 },
  { name: "Yellow", value: 3 },
  { name: "Blue", value: 4 },
];

const colorCodeClasses = {
  1: "green",
  2: "red",
  3: "yellow",
  4: "blue",
  default: "bg-gray-50",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Lec_Dashboard_Main() {
  const [assigned, setAssigned] = useState({
    name: "",
    avatar: "",
    value: null,
  });
  const [labelled, setLabelled] = useState({ name: "Green", value: 1 });
  const [lecturer_id, setLecturer_id] = useState("");
  const [colorCode, setColorCode] = useState("1");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [announcementId, setAnnouncementId] = useState("");

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
        setLecturer_id(response.data.id);
        setAssigned({
          name:
            response.data.role +
            " " +
            response.data.admin.first_name +
            " " +
            response.data.admin.last_name,
          avatar: backendUrl + response.data.profile_pic,
          value: response.data.id,
        });
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
  }, [refresh]);

  useEffect(() => {
    setAnnouncements(
      allAnnouncements.filter(
        (announcement) => announcement.lecturer_details.id === lecturer_id
      )
    );
  }, [allAnnouncements, refresh]);

  const handleAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("message", message);
      formData.append("color_code", colorCode);
      formData.append("lecturer_id", lecturer_id);

      const response = await axios.post(
        `${backendUrl}/api/announcement_add`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDialog = (e) => {
    setAnnouncementId(e);
    setOpenDialog(true);
  };

  const handleAnnouncementDelete = async () => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/announcement_detail/${announcementId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      setRefresh((prev) => !prev);
      setAnnouncementId("");
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setTitle("");
    setMessage("");
    setLabelled({ name: "Green", value: 1 });
    setColorCode("1");
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 space-y-4">
      <form method="post" className="relative">
        <h1 className="m-2 text-2xl text-left font-bold text-gray-500">
          Send announcement
        </h1>
        <div className="overflow-hidden rounded-lg border bg-gray-300 border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
            placeholder="Title"
          />
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            rows={2}
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Write a message..."
            defaultValue={""}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
          <div className="flex flex-nowrap justify-start space-x-2 px-2 py-2 sm:px-3">
            <Listbox
              as="div"
              value={assigned}
              onChange={setAssigned}
              className="flex-shrink-0"
            >
              <Listbox.Label className="sr-only">Assign</Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                  {assigned.value === null ? (
                    <UserCircleIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1"
                      aria-hidden="true"
                    />
                  ) : (
                    <img
                      src={assigned.avatar}
                      alt=""
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                    />
                  )}

                  <span
                    className={classNames(
                      assigned.value === null ? "" : "text-gray-900",
                      "hidden truncate sm:ml-2 sm:block"
                    )}
                  >
                    {assigned.value === null ? "Assign" : assigned.name}
                  </span>
                </Listbox.Button>
              </div>
            </Listbox>

            <Listbox
              as="div"
              value={labelled}
              onChange={(e) => {
                setLabelled(e);
                setColorCode(e.value);
              }}
              className="flex-shrink-0"
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                      <div
                        className={classNames(
                          labelled.value === 1
                            ? "rounded-full bg-green-500"
                            : (labelled.value === 2 &&
                                "rounded-full bg-red-500") ||
                                (labelled.value === 3 &&
                                  "rounded-full bg-yellow-500") ||
                                (labelled.value === 4 &&
                                  "rounded-full bg-blue-500") ||
                                "rounded-full bg-gray-300",
                          "h-5 w-5 flex-shrink-0 sm:-ml-1"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          labelled.value === null ? "" : "text-gray-900",
                          "hidden truncate sm:ml-2 sm:block"
                        )}
                      >
                        {labelled.value === null ? "Label" : labelled.name}
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {labels.map((label) => (
                          <Listbox.Option
                            key={label.value}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-gray-100" : "bg-white",
                                "relative cursor-default select-none px-3 py-2"
                              )
                            }
                            value={label}
                          >
                            <div className="flex items-center">
                              <span className="block truncate font-medium">
                                {label.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  handleAnnouncement(e);
                  closeForm();
                }}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
      {announcements.map((announcement) => (
        <div
          className={`rounded-md bg-${
            colorCodeClasses[announcement.color_code]
          }-50 p-4 text-left`}
        >
          <div className="flex">
            <div className="ml-3">
              <h3
                className={`text-sm font-medium text-${
                  colorCodeClasses[announcement.color_code]
                }-800`}
              >
                {announcement.title}
              </h3>
              <div
                className={`mt-2 text-sm text-${
                  colorCodeClasses[announcement.color_code]
                }-700`}
              >
                <p>{announcement.message}</p>
              </div>
            </div>
          </div>
          <div className="mb-1 mr-3 flex justify-end">
            <Link
              className="text-red-600 hover:text-red-900"
              onClick={() => {
                handleDeleteDialog(announcement.id);
              }}
            >
              Delete<span className="sr-only"></span>
            </Link>
          </div>
        </div>
      ))}
      {/* Dialog Box */}
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
                          Delete
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your announcement?
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
                        handleAnnouncementDelete();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpenDialog(false);
                        setAnnouncementId("");
                      }}
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
