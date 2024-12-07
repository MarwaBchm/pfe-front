import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  // Check if the current route is "/settings"
  const isSettingsPage = location.pathname === "/dashboard/settings";

  return (
    <div
      className={`flex h-screen z-0 ${
        isSettingsPage ? "absolute w-full" : "relative"
      } lg:overflow-y-hidden`}
    >
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto relative z-10">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-1 p w-full pb-0 pr-0 bg-blue-3 z-10 relative">
          <div className="flex z-10 relative ">
            <Outlet /> {/* This renders the nested routes */}
          </div>
          {isSettingsPage && (
            <img
              src="/settings.png"
              alt="Settings Background"
              className="absolute right-0 bottom-0 opacity-80 z-0 w-64 object-cover"
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
