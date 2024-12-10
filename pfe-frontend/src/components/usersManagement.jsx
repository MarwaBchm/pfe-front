import React, { useState } from "react";
import StudentList from "./ui/studentsList";
import ProfessorList from "./ui/professorsList";
import CompanyList from "./ui/companiesList";
import AddStudent from "./ui/addStudent";
import AddProfessor from "./ui/addProfessor";
import AddCompany from "./ui/addCompany";

function StatCard({ title, value, icon, onClick, isActive }) {
  return (
    <button
      className={`shadow-md rounded-lg p-4 flex items-center justify-between transition-colors ${
        isActive
          ? "bg-blue-300 bg-opacity-30 text-blue-2 shadow-md shadow-blue-200"
          : "bg-white hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <div>
        <h3
          className={`text-sm font-Roboto ${
            isActive ? "text-blue-2" : "text-gray-500"
          }`}
        >
          {title}
        </h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </button>
  );
}

const UsersManagement = () => {
  const [userType, setUserType] = useState("Students");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("list"); // 'list' or 'add'
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextAction, setNextAction] = useState(null); // Used to queue the next action
  const [direction, setDirection] = useState("right"); // Determines animation direction
  const [searchQuery, setSearchQuery] = useState("");

  const userTypes = ["Students", "Professors", "Companies"];
  const stats = {
    Students: 45,
    Professors: 32,
    Companies: 4,
  };

  const switchActionWithAnimation = (action) => {
    if (isAnimating) return; // Prevent animation conflicts

    setDirection(action === "add" ? "right" : "left"); // Determine slide direction
    setNextAction(action); // Queue the next action
    setIsAnimating(true); // Start animation

    // Wait for animation to complete before switching the view
    setTimeout(() => {
      setCurrentAction(action);
      setIsAnimating(false);
    }, 300); // Match transition duration
  };
 const swicthToList=()=>(switchActionWithAnimation("list"));
  const renderAddForm = () => (
    <div
      className={` rounded-md w-full  h-full max-w-lg mx-auto transition-transform duration-500 ease-in-out ${
        isAnimating
          ? direction === "right"
            ? "-translate-x-full opacity-100"
            : "translate-x-full opacity-100"
          : "translate-x-0 opacity-100"
      }`}
    >
      {userType === "Students" && <AddStudent close={swicthToList}/>}
      {userType === "Professors" && <AddProfessor close={swicthToList}/>}
      {userType === "Companies" && <AddCompany close={swicthToList}/>}
    </div>
  );

  const renderListView = () => (
    <div
      className={`flex flex-col w-full transition-transform duration-300 ease-in-out ${
        isAnimating
          ? direction === "right"
            ? "translate-x-full opacity-100"
            : "-translate-x-full opacity-100"
          : "translate-x-0 opacity-100"
      }`}
    >
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-4 px-4 mt-5">
        {userTypes.map((type) => (
          <StatCard
            key={type}
            title={type}
            value={stats[type]}
            icon={
              type === "Students" ? "👩🏻‍🎓" : type === "Professors" ? "👨‍🏫" : "🏢"
            }
            isActive={userType === type} // Highlight active card
            onClick={() => setUserType(type)} // Update userType
          />
        ))}
      </div>

      {/* Dropdown, Search, and Add Button */}
      <div className="flex flex-col items-start bg-white mx-4 mt-2 rounded-xl shadow-md mb-6">
        <div className="flex flex-row justify-between items-center w-full px-6 pt-4">
          {/* Title with Dropdown */}
          <div className="relative">
            <div
              className="flex justify-between items-center text-blue-2 py-2 rounded-md cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-lg font-medium">{userType}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ml-1 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-sm px-1 py-1">
                {userTypes.map((type) => (
                  <div
                    key={type}
                    className={`px-3 py-2 hover:bg-blue-100 cursor-pointer rounded-md ${
                      userType === type
                        ? "bg-blue-500 text-white font-medium"
                        : ""
                    }`}
                    onClick={() => {
                      setUserType(type);
                      setIsDropdownOpen(false); // Close dropdown
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            className="bg-gray-50 w-2/5 rounded-md py-1 px-3 text-gray-600 placeholder:text-gray-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-6"
            placeholder={`Search ${userType.toLowerCase()} by name, email...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-blue-5 bg-opacity-80 text-white text-sm font-medium rounded-md"
            onClick={() => switchActionWithAnimation("add")}
          >
            Add a new {userType.slice(0, -1)}
          </button>
        </div>

        {/* Render the appropriate list component based on userType */}
        <div className="p-4 pb-0 w-full rounded-md shadow-md ">
          {userType === "Students" && <StudentList searchQuery={searchQuery} />}
          {userType === "Professors" && (
            <ProfessorList searchQuery={searchQuery} />
          )}
          {userType === "Companies" && (
            <CompanyList searchQuery={searchQuery} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full ">
      {currentAction === "add" ? renderAddForm() : renderListView()}
    </div>
  );
};

export default UsersManagement;
/*<div className="flex gap-4">
          <button
            type="button"
            onClick={() => switchActionWithAnimation("list")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save {userType.slice(0, -1)}
          </button>
          <button
            type="button"
            onClick={() => switchActionWithAnimation("list")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>*/
