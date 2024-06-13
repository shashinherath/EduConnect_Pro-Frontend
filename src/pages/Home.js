import React, { useEffect } from "react";
import Footer from "../components/H_Footer";
import Navbar from "../components/H_Nav_with_Hero";
import { Outlet } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "EduConnect Pro";
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
