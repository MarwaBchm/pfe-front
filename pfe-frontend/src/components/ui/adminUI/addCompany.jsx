import React, { useState, useRef } from "react";

function AddCompany({close}) {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    dateOfEstablishment: "",
    industry: "",
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
    console.log("Company Data:", formData);
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
        // TODO: Parse CSV and import companies
        console.log("CSV Content:", csvText);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md px-6 py-6 mt-3">
      <h2 className="text-17 font-Roboto font-bold text-center text-blue-2">
        🏢 Add New Company
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
        <div>
          <label
            htmlFor="companyName"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
            required
          />
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

        <div>
          <label
            htmlFor="dateOfEstablishment"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Date of Establishment
          </label>
          <input
            id="dateOfEstablishment"
            name="dateOfEstablishment"
            type="date"
            value={formData.dateOfEstablishment}
            onChange={handleInputChange}
            className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="industry"
            className="block text-13 text-gray-3 mb-0.5 pl-1"
          >
            Industry
          </label>
          <input
            id="industry"
            name="industry"
            type="text"
            value={formData.industry}
            onChange={handleInputChange}
            className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
            required
          />
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
            Add Company
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

export default AddCompany;
