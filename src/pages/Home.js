import React from "react";
import Footer from "../components/H_Footer";
import Navbar from "../components/H_Navbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
