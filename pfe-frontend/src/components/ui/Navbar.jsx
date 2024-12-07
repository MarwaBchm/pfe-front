import React, { useState } from "react";
import CurrentPathDisplay from "./currentPathDisplay";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <div className="shadow-md p-4  pb-0 flex justify-between items-end bg-blue-3">
      <CurrentPathDisplay />
      <div className="bg-white rounded-full flex flex-row items-center space-x-4 p-2 py-1.5 shadow-sm">
        {/* Search Bar */}
        <div className="relative order-1">
          <input
            type="text"
            placeholder="Search..."
            className="static  px-4 py-1  pl-9 rounded-full bg-blue-3 w-36 focus:outline-none focus:w-64  transition-all duration-500 text-blue-2"
          />
          <img
            src="/icons/selected/search.png"
            className="absolute left-3 bottom-2 w-4"
          />
        </div>
        {/* Notification Icon (Replaced with image) */}
        <div
          className="relative order-2 cursor-pointer"
          onClick={() => setShowNotification(!showNotification)}
        >
          {showNotification && (
            <img
              src="/icons/not-selected/notifications.png" // Replace this with the actual image path
              alt="Notification"
              className="w-4 h-4" // Adjust the size of your image here
            />
          )}
          {!showNotification && (
            <img
              src="/icons/selected/notifications.png" // Replace this with the actual image path
              alt="Notification"
              className="w-4 h-4" // Adjust the size of your image here
            />
          )}
          {showNotification && (
            <div className="absolute top-8 right-0 w-64 bg-white shadow-md rounded-lg p-4">
              <p>Your notifications</p>
              {/* Add actual notification content here */}
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <img
          src="/profile.jpg" // Replace with the actual profile pic URL
          alt="Profile"
          className="w-9 h-9 rounded-full order-3"
        />
      </div>
    </div>
  );
};

export default Navbar;
