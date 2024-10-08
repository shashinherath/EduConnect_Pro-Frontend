import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LecturerPortal from "./pages/LecturerPortal";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import HomeContent from "./components/H_Content";
import PageNotFound from "./components/PageNotFound";
import Admin from "./pages/Admin";
import Ad_Dashboard from "./components/Ad_Dashboard";
import Ad_Dashboard_Main from "./components/Ad_Dashboard_Main";
import Ad_Lectures from "./components/Ad_Lecturers";
import Ad_Students from "./components/Ad_Students";
import Ad_Admins from "./components/Ad_Admins";
import Ad_Courses from "./components/Ad_Courses";
import Ad_UserProfile from "./components/Ad_UserProfile";
import St_Dashboard from "./components/St_Dashboard";
import St_Dashboard_Main from "./components/St_Dashboard_Main";
import St_Courses from "./components/St_Courses";
import St_Message from "./components/St_Message";
import St_AI from "./components/St_AI";
import St_Results from "./components/St_Results";
import St_UserProfile from "./components/St_UserProfile";
import St_Materials from "./components/St_Materials";
import Lec_Dashboard from "./components/Lec_Dashboard";
import Lec_Dashboard_Main from "./components/Lec_Dashboard_Main";
import Lec_Courses from "./components/Lec_Courses";
import Lec_Message from "./components/Lec_Message";
import Lec_Attendance from "./components/Lec_Attendance";
import Lec_Assessment from "./components/Lec_Assessment";
import Lec_UserProfile from "./components/Lec_UserProfile";
import Lec_Materials from "./components/Lec_Materials";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "EduConnect Pro";
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />}>
          <Route index element={<HomeContent />} />
        </Route>

        {/* Login */}

        <Route path="login" element={<Login />} />

        {/* Lecturer */}
        <Route path="/lecturer" element={<LecturerPortal />}>
          <Route index element={<Lec_Dashboard />} />
          <Route path="dashboard" element={<Lec_Dashboard />}>
            <Route index element={<Lec_Dashboard_Main />} />
            <Route path="courses" element={<Lec_Courses />} />
            <Route path="message" element={<Lec_Message />} />
            <Route path="attendance" element={<Lec_Attendance />} />
            <Route path="assessment" element={<Lec_Assessment />} />
            <Route path="profile" element={<Lec_UserProfile />} />
            <Route path="courses/materials" element={<Lec_Materials />} />
          </Route>
        </Route>

        {/* Student */}
        <Route path="/student" element={<StudentPortal />}>
          <Route index element={<St_Dashboard />} />
          <Route path="dashboard" element={<St_Dashboard />}>
            <Route index element={<St_Dashboard_Main />} />
            <Route path="courses" element={<St_Courses />} />
            <Route path="message" element={<St_Message />} />
            <Route path="ai" element={<St_AI />} />
            <Route path="results" element={<St_Results />} />
            <Route path="profile" element={<St_UserProfile />} />
            <Route path="courses/materials" element={<St_Materials />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Ad_Dashboard />} />
          <Route path="dashboard" element={<Ad_Dashboard />}>
            <Route index element={<Ad_Dashboard_Main />} />
            <Route path="admins" element={<Ad_Admins />} />
            <Route path="lecturers" element={<Ad_Lectures />} />
            <Route path="students" element={<Ad_Students />} />
            <Route path="courses" element={<Ad_Courses />} />
            <Route path="profile" element={<Ad_UserProfile />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
