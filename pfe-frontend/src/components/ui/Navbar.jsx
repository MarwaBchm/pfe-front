import React, { useState } from "react";
import CurrentPathDisplay from "../../plugins/currentPathDisplay";
import NotificationPage from "./notification";

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);

  const Icon = ({ src, alt, size = "w-5 h-5" }) => (
    <img src={src} alt={alt} className={`${size}`} />
  );

  return (
    <div className="shadow-md p-4 pb-0 flex justify-between items-center bg-blue-3">
      {/* Current Path */}
      <CurrentPathDisplay />

      {/* Navbar Right Section */}
      <div className="bg-white rounded-full flex items-center space-x-4 p-2 px-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="static  px-4 py-1  pl-9 rounded-full bg-blue-3 w-36 focus:outline-none focus:w-64  transition-all duration-500 text-blue-2"
          />
          <Icon
            src="/icons/selected/search.png"
            alt="Search Icon"
            size="absolute left-3 bottom-2 w-4"
          />
        </div>

        {/* Notification Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => setShowNotification(!showNotification)}
        >
          {showNotification ? (
            <Icon src="/icons/not-selected/notifications.png" alt="Notification On" />
          ) : (
            <Icon src="/icons/selected/notifications.png" alt="Notification Off" />
          )}
          {showNotification && (
            <div className="absolute top-full right-0 mt-2">
              <NotificationPage isAdmin={true} />
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div>
          <Icon
            src="/profile.jpg"
            alt="Profile Picture"
            size="w-9 h-9 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
