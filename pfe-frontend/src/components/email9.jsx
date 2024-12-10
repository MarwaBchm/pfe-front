import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PFEProposalForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    proposerType: "", // Teacher, Student, or Company
    status: "Pending",
    customMessage: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // Store the generated email preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.proposerType) {
      setFormStatus("Please provide the project name and proposer type.");
      return;
    }

    // Generate the email content based on validation status
    const emailMessage = `
      Hello ${formData.proposerType},\n\n
      We have reviewed your project proposal titled "${
        formData.projectName
      }".\n\n
      ${
        formData.status === "Approved"
          ? "We are pleased to inform you that your project proposal has been approved."
          : `We require additional information to proceed with your project proposal. Please update the necessary details.`
      }
      
      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}
      
      Please take the necessary actions accordingly.
      
      Best regards,\n
      The PFE Platform Team
    `;

    // Store the generated email message
    setGeneratedEmail(emailMessage);
    setFormStatus("Email preview generated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-warning text-white text-center">
          <h4>Project Proposal Management</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            {/* Project Name Input */}
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name:
              </label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                className="form-control"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Proposer Type Input */}
            <div className="mb-3">
              <label htmlFor="proposerType" className="form-label">
                Proposer Type (Teacher, Student, Company):
              </label>
              <input
                type="text"
                id="proposerType"
                name="proposerType"
                className="form-control"
                value={formData.proposerType}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Status Dropdown */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Proposal Status:
              </label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Request More Info">Request More Info</option>
              </select>
            </div>

            {/* Custom Message Input */}
            <div className="mb-3">
              <label htmlFor="customMessage" className="form-label">
                Custom Message (optional):
              </label>
              <textarea
                id="customMessage"
                name="customMessage"
                className="form-control"
                rows="4"
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-warning w-100">
              Generate Email Preview
            </button>
          </form>

          {/* Form Status */}
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

          {/* Display Generated Email Preview */}
          {generatedEmail && (
            <div className="mt-3">
              <h5>Email Preview:</h5>
              <div className="alert alert-secondary">
                <pre>{generatedEmail}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PFEProposalForm;
