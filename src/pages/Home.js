import React, { useEffect } from "react";
import Footer from "../components/H_Footer";
import Navbar from "../components/H_Nav_with_Hero";
import H_Team from "../components/H_Team";
import H_Content from "../components/H_Content";
import H_Partners from "../components/H_Partners";

function Home() {
  useEffect(() => {
    document.title = "EduConnect Pro";
  }, []);

  return (
    <>
      <Navbar />
      <H_Content />
      <H_Partners />
      <H_Team />
      <Footer />
    </>
  );
}

export default Home;
