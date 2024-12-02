import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate();
  const csrfToken = document.head.querySelector(
    'meta[name="csrf-token"]'
  )?.content;
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); // Reset error message
      setLoading(true); // Start loading

      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      try {
        // Fetch CSRF cookie first
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          withCredentials: true,
        });

        // Send login request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login", // Backend login route
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-TOKEN": csrfToken,
            },
            withCredentials: true, // Required for cookies to work
          }
        );

        // Check for success and redirect
        if (response.status === 200) {
          navigate("/dashboard/home"); // Redirect to dashboard
        }
      } catch (error) {
        // Backend error response handling
        if (error.response && error.response.data) {
          setError(
            error.response.data.errors?.email?.[0] || "Invalid login credentials."
          );
        } else {
          setError("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false); // Stop loading after request completes
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
