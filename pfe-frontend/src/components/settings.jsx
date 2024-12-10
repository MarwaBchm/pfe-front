import React from "react";
import StudentSettings from "./ui/StudentSettings";
import ProfessorSettings from "./ui/ProfessorSettings";
import CompanySettings from "./ui/CompanySettings";

const Settings = () => {
  // Change the role to 'student', 'professor', or 'company' here
  const role = "company"; // Options: 'student', 'professor', 'company'

  return (
    <div className=" flex flex-row  w-full items-center justify-center px-20">
      {" "}
      <div
        className="
   w-full p-6 bg-white shadow  rounded-xl mt-6 bg-opacity-"
      >
        <h2 className="text-xl font-semibold   font-sans mb-2  text-left text-blue-1  ">
          My Account
        </h2>
        {role === "student" && <StudentSettings />}
        {role === "professor" && <ProfessorSettings />}
        {role === "company" && <CompanySettings />}
      </div>
    </div>
  );
};

export default Settings;
