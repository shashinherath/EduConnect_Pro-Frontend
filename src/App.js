import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LecturerPortal from "./pages/LecturerPortal";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import HomeContent from "./components/H_Content";
import PageNotFound from "./components/PageNotFound";
import About from "./components/About";
import Calendar from "./components/Calendar";
import Admin from "./pages/Admin";
import Ad_Dashboard from "./components/Ad_Dashboard";
import Ad_Dashboard_Main from "./components/Ad_Dashboard_Main";
import Ad_Lectures from "./components/Ad_Lecturers";
import Ad_Students from "./components/Ad_Students";
import Ad_Admins from "./components/Ad_Admins";
import Ad_Courses from "./components/Ad_Courses";
import Ad_Admins_Add_Form from "./components/Ad_Admins_Add_Form";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Login */}

        <Route path="login" element={<Login />} />

        {/* Lecturer */}
        <Route path="/lecturer" element={<LecturerPortal />} />
          
        {/* Student */}
        <Route path="/student" element={<StudentPortal />}>
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<Admin />} >
          <Route index element={<Ad_Dashboard />} />
          <Route path="dashboard" element={<Ad_Dashboard />} >
            <Route index element={<Ad_Dashboard_Main />} />
            <Route path="admins" element={<Ad_Admins />} />
            <Route path="lecturers" element={<Ad_Lectures />} />
            <Route path="students" element={<Ad_Students />} />
            <Route path="courses" element={<Ad_Courses />} />
            <Route path="admins/add" element={<Ad_Admins_Add_Form />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
