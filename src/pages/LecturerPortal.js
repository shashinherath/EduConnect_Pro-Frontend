import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SearchProvider } from "../components/SearchContext";
import { useEffect } from "react";
import { CourseProvider } from "../components/CourseContext";

function LecturerPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/lecturer" ||
      window.location.pathname === "/lecturer/"
    ) {
      navigate("/lecturer/dashboard");
    }
  }, []);

  return (
    <SearchProvider>
      <CourseProvider>
        <Outlet />
      </CourseProvider>
    </SearchProvider>
  );
}

export default LecturerPortal;
