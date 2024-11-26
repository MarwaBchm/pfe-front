import React, { useState, useRef } from "react";

function AddStudent({ close }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    grade: "",
    major: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    // TODO: Add actual submission logic
  };

  const handleCSVImport = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target.result;
        // TODO: Parse CSV and import students
        console.log("CSV Content:", csvText);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md px-6 py-6 mt-3">
      <h2 className="text-17 font-Roboto font-bold text-center text-blue-2">
        👩🏻‍🎓 Add New Student
      </h2>
      <h2 className="text-14 font-Arial text-center my-1 text-gray-3">or</h2>
      <div className="flex flex-row w-full justify-center mb-4 border-b">
        <button
          type="button"
          onClick={handleCSVImport}
          className="bg-green-600 text-white text-13 font-Roboto mb-2 py-1 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Import from CSV file
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row gap-3">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="lastName"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-row gap-3">
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="grade"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Master Average
            </label>
            <input
              id="grade"
              name="grade"
              type="number"
              value={formData.grade}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="major"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Major
          </label>
          <input
            id="major"
            name="major"
            type="text"
            value={formData.major}
            onChange={handleInputChange}
            className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-row justify-end w-full gap-3">
          <button
            onClick={close}
            className="bg-red-1 text-14 font-Arial text-white py-1 px-4 rounded-md hover:bg-red-2 focus:outline-none hover:text-red-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-6 text-14 font-Arial text-white py-1 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Student
          </button>
        </div>
      </form>

      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}

export default AddStudent;
