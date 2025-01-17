import React, { useState, useRef } from "react";

function AddProfessor({close}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    department: "",
    specialization: "",
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
    console.log("Professor Data:", formData);
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
        // TODO: Parse CSV and import professors
        console.log("CSV Content:", csvText);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md px-6 py-6 mt-3">
      <h2 className="text-17 font-Roboto font-bold text-center text-blue-2">
        👨‍🏫 Add New Professor
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
              htmlFor="department"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="specialization"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Specialization
          </label>
          <input
            id="specialization"
            name="specialization"
            type="text"
            value={formData.specialization}
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
            Add Professor
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

export default AddProfessor;
