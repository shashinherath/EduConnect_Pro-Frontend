import Logo from "../assets/logo/Owl only Transparant.png";
import VLE from "../assets/logo/VLE.png";
import UWU from "../assets/logo/UWU_Logo.png";

export default function H_Partners() {
  return (
    <div id="partnership" className="bg-gray-300">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-20 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-black">
            Our Partners
        </h2>
        <div className="mt-8 flow-root lg:mt-16 mb-16">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img className="h-32" src={Logo} alt="EduConnect Pro" />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img className="h-32" src={VLE} alt="VLE" />
            </div>
            <div className="mt-4 ml-8 flex flex-shrink-0 flex-grow lg:ml-4 lg:flex-grow-0">
              <img className="h-32" src={UWU} alt="UWU" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
