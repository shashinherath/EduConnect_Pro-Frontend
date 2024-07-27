import {
  UsersIcon,
  UserIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

export default function Ad_Dashboard_Main() {
  const [allAdmins, setAllAdmins] = useState([]);
  const [allLecturers, setAllLecturers] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const token = localStorage.getItem("token");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [countAllAdmins, setCountAllAdmins] = useState(0);
  const [countAllLecturers, setCountAllLecturers] = useState(0);
  const [countAllStudents, setCountAllStudents] = useState(0);
  const [countAllCourses, setCountAllCourses] = useState(0);

  const stats = [
    {
      id: 1,
      name: "Admins",
      stat: countAllAdmins,
      icon: UserIcon,
      bgColor: "bg-pink-600",
      path: "/admin/dashboard/admins",
    },
    {
      id: 2,
      name: "Lecturers",
      stat: countAllLecturers,
      icon: UsersIcon,
      bgColor: "bg-purple-600",
      path: "/admin/dashboard/lecturers",
    },
    {
      id: 3,
      name: "Students",
      stat: countAllStudents,
      icon: UserGroupIcon,
      bgColor: "bg-yellow-500",
      path: "/admin/dashboard/students",
    },
    {
      id: 4,
      name: "Courses",
      stat: countAllCourses,
      icon: InboxIcon,
      bgColor: "bg-green-500",
      path: "/admin/dashboard/courses",
    },
  ];
  const [chartOptions, setChartOptions] = useState(getInitialChartOptions());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${backendUrl}/api/admin_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllAdmins(response1.data);

        const response2 = await axios.get(`${backendUrl}/api/lecturer_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllLecturers(response2.data);

        const response3 = await axios.get(`${backendUrl}/api/student_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllStudents(response3.data);
        const response4 = await axios.get(`${backendUrl}/api/course_api`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllCourses(response4.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCountAllAdmins(allAdmins.length);
    setCountAllLecturers(allLecturers.length);
    setCountAllStudents(allStudents.length);
    setCountAllCourses(allCourses.length);

    const updatedChartOptions = getInitialChartOptions([
      allAdmins.length,
      allLecturers.length,
      allStudents.length,
      allCourses.length,
    ]);

    setChartOptions(updatedChartOptions);
  }, [allAdmins, allLecturers, allStudents, allCourses]);

  useEffect(() => {
    if (typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(
        document.getElementById("donut-chart"),
        chartOptions
      );
      chart.render();
      return () => {
        chart.destroy();
      };
    }
  }, [chartOptions]);

  return (
    <div>
      <dl className="mt-5 flex flex-wrap gap-5">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6 w-full md:w-auto lg:flex-grow"
          >
            <dt>
              <div className={`absolute rounded-md ${item.bgColor} p-3`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 text-left">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>

              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    to={item.path}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {" "}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex justify-center">
        <div className="w-full bg-white rounded-lg shadow p-4 md:p-6 mt-5 h-[350px]">
          <div className="py-6" id="donut-chart"></div>
        </div>
      </div>
    </div>
  );
}

const getInitialChartOptions = (counts = [0, 0, 0, 0]) => {
  const bgColors = {
    "bg-pink-600": "#ec4899",
    "bg-purple-600": "#8b5cf6",
    "bg-yellow-500": "#eab308",
    "bg-green-500": "#22c55e",
  };

  const chartColors = [
    bgColors["bg-pink-600"],
    bgColors["bg-purple-600"],
    bgColors["bg-yellow-500"],
    bgColors["bg-green-500"],
  ];
  return {
    series: counts,
    colors: chartColors,
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "All Stats",
              fontFamily: "Inter, sans-serif",
              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return sum;
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value;
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -2,
      },
    },
    labels: ["Admins", "Lecturers", "Students", "Courses"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
};
