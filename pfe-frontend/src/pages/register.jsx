import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/axios"; // Adjust the import path

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register", // Adjust the endpoint to your actual registration route
        { firstName, lastName, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(
          error.response.data.errors?.email?.[0] ||
            "Registration failed. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-register-bg bg-center bg-cover">
      <div className="px-16 py-6 bg-white bg-opacity-10 backdrop-blur-sm shadow-lg rounded-3xl justify-center items-center flex flex-col border-2 border-opacity-25 border-gray-100">
        <div className="flex flex-row items-center my-8 gap-3">
          <img src="/logo.png" alt="Logo" className="h-14" />
          <h2 className="text-3xl font-NovaFlat font-thin text-white">
            GradMastery
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 border border-green-400 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 text-sm text-white">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 text-sm text-white">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 text-sm text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="username@univ-tlemcen.dz"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 text-sm text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 text-sm text-white">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-7 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
