import React from "react";
import { useCourse } from "./CourseContext";

export default function Lec_Materials() {
  const { materialCourseId } = useCourse();
  const { materialCourseTitle } = useCourse();
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 text-left">
        {materialCourseTitle}
      </h1>
      <h1>Course ID: {materialCourseId}</h1>
    </div>
  );
}
