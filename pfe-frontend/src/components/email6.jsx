import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const PFEEncadrementForm = () => {
  const [formData, setFormData] = useState({
    subject: "Call for PFE Supervision: Student and Enterprise Proposals",
    customMessage: "",
    projectType: "",
    proposer: "",
  });
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // State to store the generated email preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.projectType || !formData.proposer) {
      setFormStatus("Please fill in all the fields.");
      return;
    }

    // Generate the email content
    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear Professor,

      We would like to invite you to supervise the following PFE proposals:

      Proposal Type: ${formData.projectType}
      Proposal submitted by: ${formData.proposer}

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      The proposals are available for review. Kindly confirm your participation as a supervisor.

      You can access the proposal portal here: http://localhost:5173/dashboard/pfe-proposals

      Best regards,
      PFE Management Team
    `;

    // Set the generated email preview to state
    setGeneratedEmail(emailMessage);
    setFormStatus(
      "Encadrement invitation email configured successfully! Check below for the preview."
    );
  };
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-info text-white text-center">
          <h4>Configure PFE Encadrement Invitation Email</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            {/* Subject Input */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Email Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                placeholder="Call for PFE Supervision: Student and Enterprise Proposals"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Project Type Select */}
            <div className="mb-3">
              <label htmlFor="projectType" className="form-label">
                Type of Project:
              </label>
              <select
                id="projectType"
                name="projectType"
                className="form-control"
                value={formData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Project Type</option>
                <option value="Student">Student Proposal</option>
                <option value="Enterprise">Enterprise Proposal</option>
              </select>
            </div>

            {/* Proposer Input */}
            <div className="mb-3">
              <label htmlFor="proposer" className="form-label">
                Proposer Name:
              </label>
              <input
                type="text"
                id="proposer"
                name="proposer"
                className="form-control"
                placeholder="Enter Name of the Student/Enterprise"
                value={formData.proposer}
                onChange={handleInputChange}
                required
              />
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
                placeholder="Add any additional instructions or reminders here..."
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-info w-100">
              Generate Encadrement Invitation Email
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

export default PFEEncadrementForm;
