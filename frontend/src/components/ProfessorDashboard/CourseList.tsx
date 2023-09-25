// Author: Yatrik Pravinbhai Amrutiya
import React from "react";
import CourseCard from "./CourseCard";
import { course } from "../model/course.model"; // Assuming you have a model for the course

function CourseList({ courses }: { courses: course[] }) {
  return (
    <div className="course-list">
      <div className="Headers">Courses</div>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}

export default CourseList;
