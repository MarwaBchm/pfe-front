import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const PFEVALIDATION = () => {
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

  const sendEmail = (status, recipientType, projectName, customMessage) => {
    let emailMessage = "";
    let subject = "";

    if (status === "Approved") {
      subject = `Project Proposal Approved – ${projectName}`;
      emailMessage = `
        Hello ${recipientType},
        
        We are pleased to inform you that your project proposal titled "${projectName}" has been successfully validated and approved.

        You can now proceed with the next steps on the platform.

        Best regards,
        The PFE Platform Team
      `;
    } else if (status === "Rejected") {
      subject = `Project Proposal Rejected – ${projectName}`;
      emailMessage = `
        Hello ${recipientType},
        
        After review, we regret to inform you that your project proposal titled "${projectName}" has not been approved.

        If you would like to make modifications or resubmit the proposal, please follow the instructions provided below.

        Best regards,
        The PFE Platform Team
      `;
    } else if (status === "Request More Info") {
      subject = `Request for More Information – Project Proposal ${projectName}`;
      emailMessage = `
        Hello ${recipientType},
        
        We require additional information to proceed with the validation of your project proposal titled "${projectName}".

        Please update the necessary details and resubmit your proposal. Once the requested information is provided, we will review it again.

        ${customMessage ? `Note: ${customMessage}` : ""}

        Best regards,
        The PFE Platform Team
      `;
    }

    console.log("Sending email with subject:", subject);
    console.log("Email content:", emailMessage);
    return emailMessage;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.proposerType) {
      setFormStatus("Please provide the project name and proposer type.");
      return;
    }

    const emailMessage = sendEmail(
      formData.status,
      formData.proposerType,
      formData.projectName,
      formData.customMessage
    );

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

            {/* Proposer Type Input (Dropdown) */}
            <div className="mb-3">
              <label htmlFor="proposerType" className="form-label">
                Proposer Type:
              </label>
              <select
                id="proposerType"
                name="proposerType"
                className="form-control"
                value={formData.proposerType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Proposer Type</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
                <option value="Company">Company</option>
              </select>
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
                <option value="Rejected">Rejected</option>
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

export default PFEVALIDATION;
