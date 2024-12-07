import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import React Icons for eye and eye-slash

const CompanySettings = () => {
  const [company, setCompany] = useState({
    companyName: "Tech Innovations Inc.",
    companyType: "Software Development",
    representativeName: "John Doe",
    representativeEmail: "john.doe@example.com",
    representativePhone: "123-456-7890",
    password: "password123",
  });
  const [selectedImage, setSelectedImage] = useState("/profile.jpg");

  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const [password, setPassword] = useState(company.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password

  const handleSaveChanges = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Changes saved:", { ...company, password });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowConfirmPassword(true); // Show confirm password when password is changed
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col gap-8 z-50">
      <div className="flex flex-row mx-auto w-full justify-center items-center gap-6 mb-5 lg:pr-14">
        <div className="relative">
          <label
            htmlFor="imageInput"
            className="block w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Select Image</span>
              </div>
            )}
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col justify-center items-center pl-3">
          <h1 className="text-xl font-semibold font-sans text-slate-700">
            {company.companyName}
          </h1>
          <h1 className="text-13 font-medium text-gray-400">
            {company.companyType}
          </h1>
          <div className="flex flex-row gap-4 pt-3">
            <button
              className="bg-blue-5 py-0.5 rounded px-3 text-white text-13 font-sans hover:bg-blue-700 focus:outline-none"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
            <button className="bg-red-2 py-0.5 rounded px-3 text-red-3 text-13 font-sans hover:bg-red-600 hover:text-white focus:outline-none">
              Discard
            </button>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col px- pt-2">
        <div className="flex flex-col w-1/2 border-r border-gray-300 justify-start items-start">
          <h1 className="text-17 text-blue-1 font-sans font-medium">
            📋 Company Information
          </h1>
          <div className="flex flex-col justify-start items-start mt-5 mb-5 gap-2 w-full pl-2">
            <div className="flex flex-row justify-start items-end pl-4 gap-3 w-full">
              <h1 className="text-14 font-medium font-sans text-gray-3 ">
                Company Name:{" "}
              </h1>
              <h1 className="text-15 font-medium font-sans text-slate-700">
                {company.companyName}
              </h1>
            </div>
            <div className="flex flex-row justify-start items-end pl-4 gap-3 w-full">
              <h1 className="text-14 font-medium font-sans text-gray-3 ">
                Company Type:{" "}
              </h1>
              <h1 className="text-15 font-medium font-sans text-slate-700">
                {company.companyType}
              </h1>
            </div>
            <h1 className="text-17 text-blue-1 font-sans font-medium mt-6">
              👨‍💼 Representative Information
            </h1>

            <div className="flex flex-row justify-start items-start pl-4 gap-3 w-full mt-2">
              <h1 className="text-14 font-medium font-sans text-gray-3 ">
                Name:{" "}
              </h1>
              <h1 className="text-15 font-medium font-sans text-slate-700">
                {company.representativeName}
              </h1>
            </div>

            <div className="flex flex-row justify-start items-start pl-4 gap-3 w-full ">
              <h1 className="text-14 font-medium font-sans text-gray-3 ">
                Phone:{" "}
              </h1>
              <h1 className="text-15 font-medium font-sans text-slate-700">
                {company.representativePhone}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col pl-4 justify-start">
          <h1 className="text-17 text-blue-1 font-sans font-medium ">
            🔐 Account Settings
          </h1>
          <div className="flex flex-row justify-between items-center w-full gap-3 mt-4 pl-5">
            <h1 className="text-14 font-medium font-sans text-gray-3 w-1/3 ">
              Email
            </h1>
            <input
              type="email"
              placeholder="Representative Email"
              className="w-full py-1 px-2 rounded-none bg-white  border-t-0 border-r-0 border-l-0 border-b focus:outline-none  focus:border-blue-400 text-15 font-sans text-slate-700 "
              value={company.representativeEmail}
              onChange={(e) =>
                setCompany({
                  ...company,
                  representativeEmail: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full gap-3 mt-4 pl-5">
            <h1 className="text-14 font-medium font-sans text-gray-3 w-1/3 ">
              Password
            </h1>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full py-1 px-2 rounded-none bg-white  border-t-0 border-r-0 border-l-0 border-b focus:outline-none focus:border-red-400 text-15 font-sans text-slate-700"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {showConfirmPassword && (
            <div className="flex flex-row justify-start items-center w-full gap-3 mt-4 pl-5">
              <h1 className="text-14 font-medium font-sans text-gray-3 w-1/3">
                Recheck
              </h1>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"} // Same visibility toggle
                  placeholder="Confirm Password"
                  className="w-full py-1 px-2 rounded-none bg-white  border-t-0 border-r-0 border-l-0 border-b focus:outline-none focus:border-red-400 text-15 font-sans text-slate-700"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
