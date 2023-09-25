// Author: Yatrik Pravinbhai Amrutiya
import React, { useEffect, useState } from "react";
import StudContent from "./student/StudentContent";
import ProfContent from "./professor/ProfessorContent";

function Content() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Fetch the user_type from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserType(parsedUserData.user_type);
    }
  }, []);

  return (
    <>
      {userType === "stud" && <StudContent />}
      {userType === "prof" && <ProfContent />}
    </>
  );
}

export default Content;
