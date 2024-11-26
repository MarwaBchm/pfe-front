import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen lg:overflow-y-hidden">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main className="flex-1 p  w-full pb-0 pr-0 bg-blue-3 ">
          <div className="  flex  ">
            <Outlet /> {/* This renders the nested routes */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
