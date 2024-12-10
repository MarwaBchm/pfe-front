import React from "react";
import ProfessorWishList from "./ui/ProfessorWishList";
import StudentWishList from "./ui/StudentWishList";

const WishList = () => {
  // Define the role (Change 'professor' to 'student' to test)
  const role = 'student'; // Change to 'student' to display StudentWishList

  return (
    <div className="w-full">
      {role === 'professor' ? <ProfessorWishList /> : <StudentWishList />}
    </div>
  );
};

export default WishList;
