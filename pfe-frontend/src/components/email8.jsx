import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NonSelectionNotificationForm = () => {
  const [formData, setFormData] = useState({
    subject: "PFE Project Submission Status: Not Selected",
    studentName: "",
    enterpriseName: "",
    projectTitle: "",
    reason: "",
    customMessage: "",
  });

  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.studentName || !formData.projectTitle) {
      setFormStatus("Please fill in all the required fields.");
      return;
    }

    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear ${formData.studentName} and ${
      formData.enterpriseName || "Enterprise"
    },

      We regret to inform you that your PFE project titled "${
        formData.projectTitle
      }" has not been selected for this session.

      Reason: ${formData.reason}

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      We encourage you to explore other opportunities on the platform and continue engaging with us.

      You can access the platform for more details here: http://localhost:5173/dashboard/home

      Best regards,
      PFE Management Team
    `;

    setGeneratedEmail(emailMessage);
    setFormStatus("Non-selection notification email configured successfully!");
  };

  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Configure Non-Selection Notification Email
      </h3>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Subject Input */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Email Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Student Name Input */}
        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name:
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Student's Name"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Enterprise Name Input */}
        <div>
          <label
            htmlFor="enterpriseName"
            className="block text-sm font-medium text-gray-700"
          >
            Enterprise Name (optional):
          </label>
          <input
            type="text"
            id="enterpriseName"
            name="enterpriseName"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Enterprise Name"
            value={formData.enterpriseName}
            onChange={handleInputChange}
          />
        </div>

        {/* Project Title Input */}
        <div>
          <label
            htmlFor="projectTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Project Title:
          </label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Project Title"
            value={formData.projectTitle}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Reason for Non-Selection */}
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason for Non-Selection:
          </label>
          <textarea
            id="reason"
            name="reason"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Enter the reason for non-selection"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
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
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Add any additional message here..."
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

      {/* Generated Email */}
      {generatedEmail && (
        <div className="mt-6">
          <h5 className="text-lg font-medium text-gray-800">
            Generated Email Preview:
          </h5>
          <div className="mt-2 p-4 bg-gray-100 text-gray-700 rounded-md">
            <pre className="whitespace-pre-wrap">{generatedEmail}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default NonSelectionNotificationForm;
