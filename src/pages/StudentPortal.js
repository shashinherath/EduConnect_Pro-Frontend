import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SearchProvider } from "../components/SearchContext";

function StudentPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname === "/student" ||
      window.location.pathname === "/student/"
    ) {
      navigate("/student/dashboard");
    }
  }, []);

  return (
    <SearchProvider>
      <Outlet />
    </SearchProvider>
  );
}

export default StudentPortal;
