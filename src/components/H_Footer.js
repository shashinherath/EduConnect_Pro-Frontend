import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Home
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Team
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                About
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Partnership
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Privacy Policy
              </a>
            </div>

            <div className="px-5 py-2">
              <a href="#" className="text-base text-gray-300 hover:text-white">
                Terms and Conditions
              </a>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-300">
            &copy; {new Date().getFullYear()} EduConnect Pro. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
