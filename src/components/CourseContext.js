import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [materialCourseId, setMaterialCourseId] = useState("");
  const [materialCourseTitle, setMaterialCourseTitle] = useState("");

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
