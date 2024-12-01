import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PFEProposals = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    options: "",
    description: "",
  });
  const [submittedProjects, setSubmittedProjects] = useState([]);
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { title, type, description } = formData;
    if (!title || !type || !description) {
      setFormStatus("Please fill out all required fields.");
      return;
    }

    // Add to submitted projects
    setSubmittedProjects((prevProjects) => [...prevProjects, formData]);

    // Clear form
    setFormData({
      title: "",
      type: "",
      options: "",
      description: "",
    });

    setFormStatus("PFE Proposal submitted successfully!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Submit PFE Proposals</h2>
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h4>Submit a New Proposal</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Project Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter the title of the PFE"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Type */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Type of Project:
              </label>
              <select
                id="type"
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a type</option>
                <option value="Classical">Classical</option>
                <option value="Startup">Startup</option>
                <option value="Patent">Patent</option>
                <option value="SME">SME</option>
              </select>
            </div>

            {/* Options */}
            <div className="mb-3">
              <label htmlFor="options" className="form-label">
                Options (Optional):
              </label>
              <input
                type="text"
                id="options"
                name="options"
                className="form-control"
                placeholder="e.g., Software Development, AI, etc."
                value={formData.options}
                onChange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Project Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Provide a detailed description of the project"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Submit Proposal
            </button>
          </form>

          {/* Status Feedback */}
          {formStatus && (
            <div
              className={`mt-3 alert ${
                formStatus.includes("success")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {formStatus}
            </div>
          )}
        </div>
      </div>

      {/* Submitted Proposals */}
      {submittedProjects.length > 0 && (
        <div className="mt-5">
          <h4>Submitted PFE Proposals:</h4>
          <ul className="list-group">
            {submittedProjects.map((project, index) => (
              <li key={index} className="list-group-item">
                <strong>{project.title}</strong> - {project.type}
                <p>{project.description}</p>
                {project.options && <small>Options: {project.options}</small>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PFEProposals;
