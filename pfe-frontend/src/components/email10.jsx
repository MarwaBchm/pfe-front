import React, { useState } from "react";

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Project Proposal Management
      </h3>

      <form onSubmit={handleFormSubmit}>
        {/* Project Name Input */}
        <div className="form-group mb-4">
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            placeholder="Enter the project name"
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.projectName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Proposer Type Input (Dropdown) */}
        <div className="form-group mb-4">
          <label
            htmlFor="proposerType"
            className="block text-sm font-medium text-gray-700"
          >
            Proposer Type:
          </label>
          <select
            id="proposerType"
            name="proposerType"
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="form-group mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Proposal Status:
          </label>
          <select
            id="status"
            name="status"
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        <div className="mb-4">
          <label
            htmlFor="customMessage"
            className="block text-sm font-medium text-gray-700"
          >
            Custom Message (optional):
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            placeholder="Enter any additional message here (optional)"
            className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            value={formData.customMessage}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mt-4"
        >
          Generate Email Preview
        </button>
      </form>

      {/* Form Status */}
      {formStatus && (
        <div
          className={`alert mt-4 ${
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
        <div className="email-preview mt-4">
          <h5 className="text-lg font-semibold">Email Preview:</h5>
          <pre className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            {generatedEmail}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PFEVALIDATION;
