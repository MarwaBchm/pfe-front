
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex w-screen h-screen overflow-y-auto flex-col justify-center items-center bg-white">
       
      <img src="/error.png"  className=" h-[50%]"/>
      <h1 className=" text-3xl text-red-1 font-semibold font-sans">OOPS!</h1>
      <h1 className=" text-xl text-blue-1 mb-8 font-sans">You can't access this page!</h1>

    <Link to="/" className="rounded-full px-3 py-1 border-2  border-green-1 text-green-1 text-14 font-medium font-sans">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
