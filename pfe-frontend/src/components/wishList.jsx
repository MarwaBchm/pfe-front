import React from "react";
import ProfessorWishList from "./ui/ProfessorWishList";
import StudentWishList from "./ui/StudentWishList";
import AdminWishList from "./ui/AdminWishList";
const WishList = () => {
  // Define the role (Change 'professor' to 'student' or 'admin' to test)
  const role = "admin"; // Change to 'student' to display StudentWishList

  return (
    <div className=" flex justify-start items-start  w-full mx-2 my-3 rounded-md">
      {role === "professor" ? (
        <ProfessorWishList />
      ) : role === "student" ? (
        <StudentWishList />
      ) : (
        <AdminWishList />
      )}
    </div>
  );
};

export default WishList;
