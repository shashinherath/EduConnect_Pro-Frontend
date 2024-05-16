import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeacherPortal from "./pages/TeacherPortal";
import StudentPortal from "./pages/StudentPortal";
import Login from "./components/Login";
import HomeContent from "./components/HomeContent";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/teacher" element={<TeacherPortal />} />
        <Route path="/student" element={<StudentPortal />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
