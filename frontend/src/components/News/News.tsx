import React, { useEffect, useState } from "react";
import AdminNews from "./admin/Index";
import UsersNews from "./users/Index";

function News() {
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
      {userType === "stud"  && <UsersNews />}
      {userType === "prof" && <UsersNews />}
      {userType === "admin" && <AdminNews />}
    </>
  );
}

export default News;
