import React, { useEffect } from "react";
import Footer from "../components/H_Footer";
import Navbar from "../components/H_Nav_with_Hero";
import H_Team from "../components/H_Team";
import H_Content from "../components/H_Content";
import { Outlet } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "EduConnect Pro";
  }, []);

  return (
    <>
      <Navbar />
      <H_Content />
      <H_Team />
      <Footer />
    </>
  );
}

export default Home;
