import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h4>Add New User</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter user's name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter user's email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </form>
          {formStatus && (
            <div
              className={`mt-3 alert ${
                formStatus.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {formStatus}
            </div>
          )}
          {generatedPassword && (
            <div className="mt-3">
              <strong>Generated Password:</strong> {generatedPassword}
            </div>
          )}
          <button
            onClick={handleReviewPageClick}
            className="btn btn-secondary w-100 mt-3"
          >
            Go to Review Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
