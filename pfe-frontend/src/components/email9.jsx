import React, { useState } from "react";

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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Project Proposal Management
      </h3>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Project Name Input */}
        <div>
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
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.projectName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Proposer Type Input */}
        <div>
          <label
            htmlFor="proposerType"
            className="block text-sm font-medium text-gray-700"
          >
            Proposer Type (Teacher, Student, Company):
          </label>
          <input
            type="text"
            id="proposerType"
            name="proposerType"
            placeholder="Enter proposer type (Teacher, Student, or Company)"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.proposerType}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Status Dropdown */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Proposal Status:
          </label>
          <select
            id="status"
            name="status"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
        <div>
          <label
            htmlFor="customMessage"
            className="block text-sm font-medium text-gray-700"
          >
            Custom Message (optional):
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            placeholder="Enter any custom message here (optional)"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={formData.customMessage}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {/* Form Status */}
      {formStatus && (
        <div
          className={`mt-6 p-4 rounded-md ${
            formStatus.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {formStatus}
        </div>
      )}

      {/* Display Generated Email Preview */}
      {generatedEmail && (
        <div className="mt-6">
          <h5 className="text-lg font-medium text-gray-800">Email Preview:</h5>
          <div className="mt-2 p-4 bg-gray-100 text-gray-700 rounded-md">
            <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PFEProposalForm;
