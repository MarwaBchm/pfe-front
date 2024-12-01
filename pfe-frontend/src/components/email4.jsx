import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EnterprisePFEProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    options: "",
    description: "",
  });
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
    const { title, description } = formData;
    if (!title || !description) {
      setFormStatus("All required fields must be filled out.");
      return;
    }

    // Add new proposal
    setProposals((prevProposals) => [
      ...prevProposals,
      { ...formData, id: Date.now() },
    ]);

    // Clear form
    setFormData({ title: "", options: "", description: "" });
    setFormStatus("Proposal submitted successfully!");
  };

  const handleDelete = (id) => {
    setProposals((prevProposals) =>
      prevProposals.filter((proposal) => proposal.id !== id)
    );
  };

  const handleEdit = (id) => {
    const proposalToEdit = proposals.find((proposal) => proposal.id === id);
    setFormData(proposalToEdit);
    setProposals((prevProposals) =>
      prevProposals.filter((proposal) => proposal.id !== id)
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Enterprise PFE Proposals</h2>

      {/* Proposal Form */}
      <div className="card mb-4">
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
                placeholder="Enter the title of the project"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
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
                placeholder="e.g., AI, Web Development, IoT"
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

      {/* Proposal List */}
      <div>
        <h4 className="mb-3">Your Submitted Proposals</h4>
        {proposals.length > 0 ? (
          <ul className="list-group">
            {proposals.map((proposal) => (
              <li
                key={proposal.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{proposal.title}</strong>
                  <p className="mb-1">{proposal.description}</p>
                  {proposal.options && (
                    <small>Options: {proposal.options}</small>
                  )}
                </div>
                <div>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => handleEdit(proposal.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(proposal.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No proposals submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnterprisePFEProposals;
