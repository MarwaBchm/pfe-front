import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setFormStatus("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus("Please enter a valid email address.");
      return;
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    setGeneratedPassword(tempPassword);

    try {
      // Send data to the backend
      const response = await axios.post("http://localhost:5000/api/users", {
        ...formData,
        password: tempPassword,
      });

      if (response.status === 201) {
        setFormStatus("User added and email sent successfully!");
        setFormData({ name: "", email: "" });
      }
    } catch (error) {
      console.error(error);
      setFormStatus("Failed to add user. Please try again.");
    }
  };

  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-6">
        <h4 className="text-2xl font-semibold text-blue-600">Add New User</h4>
      </div>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user's name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter user's email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add User
        </button>
      </form>

      {formStatus && (
        <div
          className={`mt-3 p-4 rounded-md text-white ${
            formStatus.includes("successfully") ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {formStatus}
        </div>
      )}

      {generatedPassword && (
        <div className="mt-4 text-lg font-medium text-gray-700">
          <strong>Generated Password:</strong> {generatedPassword}
        </div>
      )}

      <button
        onClick={handleReviewPageClick}
        className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Go to Review Page
      </button>
    </div>
  );
};

export default AddUserForm;
