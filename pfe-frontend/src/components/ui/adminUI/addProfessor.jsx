import React, { useState, useRef } from "react";
import axios from "axios"; // Import axios for backend requests

function AddProfessor({ close }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfRecrutement: "", // Ensure this is a string in YYYY-MM-DD format
    grade: "Assistant Lecturer Class B", // Default value based on your migration
    role: "professor", // Set the role to 'professor'
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for progress bar
  const [progress, setProgress] = useState(0); // Progress state for the linear bar
  const [error, setError] = useState(""); // To show error messages
  const [success, setSuccess] = useState(""); // To show success message
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading
    setProgress(0); // Reset progress

    // Map the frontend field names to the backend field names
    const professorData = {
      email: formData.email,
      firstname: formData.firstName,
      lastname: formData.lastName,
      grade: formData.grade,
      recruitment_date: formData.dateOfRecrutement, // Map to backend field name
      role: formData.role, // Ensure the role is set to 'professor'
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        professorData,
        {
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage); // Update progress
          },
        }
      );

      console.log("Professor added:", response.data);
      setSuccess("Professor successfully added!");
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error adding professor:", error);
      setLoading(false); // Stop loading on error
      setError("There was an error adding the professor.");
    }
  };

  const handleCSVImport = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("csv_file", file); // Append the file with the key 'csv_file'

      setLoading(true); // Start loading
      setProgress(0); // Reset progress

      // Send the form data to the backend
      axios
        .post("http://127.0.0.1:8000/api/bulk-import-users", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentage); // Update progress
          },
        })
        .then((response) => {
          console.log("Professors added from CSV:", response.data);
          setLoading(false); // Stop loading
          setSuccess("Professors successfully imported from CSV!");
        })
        .catch((error) => {
          console.error("Error importing professors from CSV:", error);
          setLoading(false); // Stop loading on error
          setError("There was an error importing the professors.");
        });
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

      {/* Linear Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Success or Error Message */}
      {success && (
        <div className="text-green-600 text-center bg-green-200 my-3 py-1">
          {success}
        </div>
      )}
      {error && (
        <div className="text-red-600 text-center  my-3 py-1 bg-red-2">
          {error}
        </div>
      )}

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
              value={password}
              onChange={handlePasswordChange}
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
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-1.5 px-3 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="recruitementDate"
              className="block text-13 text-gray-3 mb-0.5 pl-1"
            >
              Recruitement date
            </label>
            <input
              id="recruitementDate"
              name="dateOfRecrutement"
              type="date"
              value={formData.dateOfRecrutement}
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
              Grade
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="w-full border-gray-200 text-blue-2 font-Arial text-13 py-2  px-3 pr-0 focus:outline-none focus:border-blue-600 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500"
              required
            >
              <option value="Assistant Lecturer Class B">
                Assistant Lecturer Class B
              </option>
              <option value="Assistant Lecturer Class A">
                Assistant Lecturer Class A
              </option>
              <option value="Lecturer">Lecturer</option>
              <option value="Senior Lecturer">Senior Lecturer</option>
              <option value="Professor">Professor</option>
            </select>
          </div>
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

      {/* Hidden file input for CSV */}
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
