import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SearchProvider } from "../components/SearchContext";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <SearchProvider>
      <Outlet />
    </SearchProvider>
  );
}

export default Admin;
