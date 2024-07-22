import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Shashin from "../assets/team_images/Shashin.jpeg";
import PSDM from "../assets/team_images/PSDM.jpg";
import Vinushi from "../assets/team_images/Vinushi.jpg";
import Ranuli from "../assets/team_images/Ranuli.jpg";
import Janith from "../assets/team_images/janith.png";

const people = [
  {
    name: "Shashin Herath",
    role: "Project Leader",
    imageUrl: Shashin,
  },
  {
    name: "Savindu Dinul",
    role: "Technical Architect",
    imageUrl: PSDM,
  },
  {
    name: "Vinushi Ranshila",
    role: "Intergration Manager",
    imageUrl: Vinushi,
  },
  {
    name: "Ranuli Jayanima",
    role: "Quality Analyst",
    imageUrl: Ranuli,
  },
  {
    name: "Janith Chathuranga",
    role: "Process Designer",
    imageUrl: Janith,
  },
];

export default function H_Team() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id="team" className="bg-white py-24 sm:py-32 text-left">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Meet our leadership
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Our leadership team is made up of experienced educators and tech experts dedicated to transforming education. They guide EduConnect Pro in creating an engaging and innovative learning platform for students and educators.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="center-bottom"
                className="flex items-center gap-x-6"
              >
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt="team"
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
