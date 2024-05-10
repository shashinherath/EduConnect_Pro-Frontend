import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  // write switch statement to determine which component to render based on url location

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="" alt="EduConnect Pro" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to EduConnect Pro
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            EduConnect Pro is a platform that connects teachers and students
            from all over the world. We provide a safe and secure environment
            for students to learn and teachers to teach. Our platform is easy to
            use and we have a dedicated team of professionals to help you with
            any questions you may have. Sign up today and start learning or
            teaching with EduConnect Pro!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
