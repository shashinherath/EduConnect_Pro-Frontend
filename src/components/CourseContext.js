import React, { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [materialCourseId, setMaterialCourseId] = useState("");
  const [materialCourseTitle, setMaterialCourseTitle] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("materialCourseId");
    setMaterialCourseId(storedId);
    const storedTitle = localStorage.getItem("materialCourseTitle");
    setMaterialCourseTitle(storedTitle);
  }, []);

  useEffect(() => {
    localStorage.setItem("materialCourseId", materialCourseId);
    localStorage.setItem("materialCourseTitle", materialCourseTitle);
  }, [materialCourseId, materialCourseTitle]);

  return (
    <CourseContext.Provider
      value={{
        materialCourseId,
        setMaterialCourseId,
        materialCourseTitle,
        setMaterialCourseTitle,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
