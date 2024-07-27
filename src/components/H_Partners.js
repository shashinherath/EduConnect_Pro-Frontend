import Logo from "../assets/logo/Owl only Transparant.png";
import VLE from "../assets/logo/VLE.png";
import UWU from "../assets/logo/UWU_Logo.png";
import OpenAI from "../assets/logo/OpenAI_Logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function H_Partners() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id="partnership" className="bg-gray-300">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="center-bottom"
          className="text-3xl font-bold tracking-tight text-black"
        >
          Our Partners
        </h2>
        <div className="mt-8 flow-root lg:mt-16 mb-16">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
              className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0"
            >
              <img className="h-20 sm:h-32" src={Logo} alt="EduConnect Pro" />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
              className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0"
            >
              <img className="h-14 lg:h-24" src={OpenAI} alt="VLE" />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
              className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0"
            >
              <img className="h-20 sm:h-32" src={UWU} alt="UWU" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
