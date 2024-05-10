import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TeacherPortal from './pages/TeacherPortal';
import StudentPortal from './pages/StudentPortal';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherPortal />} />
        <Route path="/student" element={<StudentPortal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
