import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  // write switch statement to determine which component to render based on url location

  switch (window.location.pathname) {
    case "/":
      return <Home />;
    case "/login":
      return <Login />;
    case "/teacher":
      return <TeacherPortal />;
    case "/student":
      return <StudentPortal />;
    default:
      return <Home />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h2>Shop</h2>
            <p>Shop page content</p>
          </div>
          <div className="col-md-4">
            <h2>User</h2>
            <p>User page content</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
