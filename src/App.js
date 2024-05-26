import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeacherPortal from "./pages/TeacherPortal";
import StudentPortal from "./pages/StudentPortal";
import Login from "./components/Login";
import HomeContent from "./components/H_Content";
import PageNotFound from "./components/PageNotFound";
import About from "./components/About";
import Calendar from "./components/Calendar";
import Admin from "./pages/Admin";
import Ad_Login from "./components/Ad_Login";
import Ad_Dashboard from "./components/Ad_Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/teacher" element={<TeacherPortal />} />
        <Route path="/student" element={<StudentPortal />}>
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="/admin" element={<Admin />} >
          <Route index element={<Ad_Login />} />
          <Route path="dashboard" element={<Ad_Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
