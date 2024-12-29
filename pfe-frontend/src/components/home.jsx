import React from "react";
import AdminDashboard from "./ui/adminDashboard";

function Home() {
  const userRole = "admin"; // Replace with dynamic role-checking logic

  return (
    <div className="flex w-full">
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : (
        <div className="min-h-screen flex items-center justify-center w-full ">
          <h1 className="text-2xl font-bold">Welcome to the User Dashboard</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
