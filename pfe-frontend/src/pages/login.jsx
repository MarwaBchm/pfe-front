import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Start loading

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      // Send login request
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login", // Backend login route
        { email, password },
        {
          headers: {
            "Content-Type": "application/json", // Fixed typo here
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Calculate 2 hours from the current time
        const expiresIn = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); // 2 hours

        // Check if the app is running in a secure (HTTPS) environment
        const isSecure = window.location.protocol === "https:";

        // Store the token in cookies with a 2-hour expiration
        Cookies.set("authToken", token, {
          expires: expiresIn,
          secure: isSecure, // Use secure cookies only in HTTPS
          sameSite: "Strict", // Prevent CSRF attacks
        });

        // Store user info in cookies with a 2-hour expiration
        Cookies.set("user", JSON.stringify(user), {
          expires: expiresIn,
          secure: isSecure, // Use secure cookies only in HTTPS
          sameSite: "Strict",
        });

        // Redirect based on user role
        navigate("/dashboard/home");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Invalid login credentials.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-login-bg bg-center bg-cover">
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

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h2 className="text-2xl font-NovaFlat font-thin tracking-wider mb-5 text-white">
              Login
            </h2>
            <label className="mb-2 text-sm text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="username@univ-tlemcen.dz"
              required
            />
          </div>

          <div className="mb-2">
            <label className="mb-2 text-sm text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-400 font-mono text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="text-sm text-white">Forgot password?</p>
          <button
            type="submit"
            className="w-full py-2 mt-7 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
