import React from "react";
import ProfessorWishList from "./ui/professorUI/ProfessorWishList";
import StudentWishList from "./ui/studentUI/StudentWishList";
import AdminWishList from "./ui/adminUI/AdminWishList";
import ResponsibleWishList from "./ui/responsibleUI/ResponsibleWishList";

const WishList = () => {
  // Define the role (Change 'professor' to 'student' or 'admin' or 'responsible' to test)
  const role = "admin"; // Change to 'student' to display StudentWishList

  return (
    <div className=" flex justify-start items-start  w-full mx-2 my-3 rounded-md">
      {role === "professor" ? (
        <ProfessorWishList />
      ) : role === "student" ? (
        <StudentWishList />
      ) : (
       role==="admin"? <AdminWishList/>:<ResponsibleWishList/>
      )}
    </div>
  );
};

export default WishList;
