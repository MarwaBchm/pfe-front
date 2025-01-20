import React, { useState } from "react";
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
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
          Configure PFE Encadrement Invitation Email
        </h3>

        <div className="p-6">
          <form onSubmit={handleFormSubmit}>
            {/* Subject Input */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block font-medium text-gray-700"
              >
                Email Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Call for PFE Supervision: Student and Enterprise Proposals"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Project Type Select */}
            <div className="mb-4">
              <label
                htmlFor="projectType"
                className="block font-medium text-gray-700"
              >
                Type of Project:
              </label>
              <select
                id="projectType"
                name="projectType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            <div className="mb-4">
              <label
                htmlFor="proposer"
                className="block font-medium text-gray-700"
              >
                Proposer Name:
              </label>
              <input
                type="text"
                id="proposer"
                name="proposer"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Name of the Student/Enterprise"
                value={formData.proposer}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Custom Message Input */}
            <div className="mb-4">
              <label
                htmlFor="customMessage"
                className="block font-medium text-gray-700"
              >
                Custom Message (optional):
              </label>
              <textarea
                id="customMessage"
                name="customMessage"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Add any additional instructions or reminders here..."
                value={formData.customMessage}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>

          {/* Form Status */}
          {formStatus && (
            <div
              className={`mt-4 p-4 rounded-md ${
                formStatus.includes("successfully")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {formStatus}
            </div>
          )}

          {/* Display Generated Email Preview */}
          {generatedEmail && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold">Email Preview:</h5>
              <div className="bg-gray-100 rounded-md p-4 mt-2">
                <pre className="text-sm text-gray-800">{generatedEmail}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PFEEncadrementForm;
