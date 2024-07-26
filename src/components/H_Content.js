import React, { useEffect } from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    name: "Personalized Learning",
    description:
      "Our AI-driven system tailors learning experiences to individual needs, providing personalized educational journeys that enhance understanding and retention.",
    icon: CloudArrowUpIcon,
    bgColor: "bg-pink-600",
  },
  {
    name: "Seamless Communication",
    description:
      "Stay connected with features like Real-Time Location Tracking, Availability Status, and an Integrated Chat Service, ensuring smooth and instant communication between students and educators.",
    icon: LockClosedIcon,
    bgColor: "bg-purple-600",
  },
  {
    name: "Resource Accessibility",
    description:
      "Easily share lecture materials, submit assignments, and access a vast resource repository. Our platform simplifies educational processes, making resources readily available to all users.",
    icon: ArrowPathIcon,
    bgColor: "bg-yellow-500",
  },
  {
    name: "Student Support",
    description:
      "Benefit from Virtual Office Hours, Feedback and Evaluation tools, and Virtual Labs designed to offer extensive support and foster a conducive learning environment.",
    icon: FingerPrintIcon,
    bgColor: "bg-green-500",
  },
];

export default function H_Content() {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <div id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="center-bottom"
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Innovating Education!
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Enhance Learning with EduConnect Pro
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            EduConnect Pro offers everything you need to elevate your
            educational experience. From seamless collaboration to advanced
            support systems, we provide tools that empower educators and engage
            students.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl text-left">
          <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="center-bottom"
                key={feature.name}
                className="relative pl-16"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div
                    className={`absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg ${feature.bgColor}`}
                  >
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
