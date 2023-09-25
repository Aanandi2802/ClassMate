import React, { useEffect, useState } from "react";
import ProfAnnouncement from "./professor/Index";
import StudentAnnouncement from "./student/Index";

function Announcement() {
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
      {userType === "stud" && <StudentAnnouncement />}
      {userType === "prof" && <ProfAnnouncement />}
    </>
  );
}

export default Announcement;
