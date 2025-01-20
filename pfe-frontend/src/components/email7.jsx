import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EncadrementInvitationForm = () => {
  const [formData, setFormData] = useState({
    subject: "PFE Encadrement Assignment Notification",
    professorName: "",
    studentName: "",
    enterpriseName: "",
    projectTitle: "",
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

    if (
      !formData.professorName ||
      !formData.studentName ||
      !formData.projectTitle
    ) {
      setFormStatus("Please fill in all the required fields.");
      return;
    }

    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear ${formData.studentName} and ${
      formData.enterpriseName || "Enterprise"
    },

      We are pleased to inform you that your PFE project titled "${
        formData.projectTitle
      }" has been assigned a supervisor.

      The assigned supervisor is Professor ${formData.professorName}.

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      We wish you success in your project and encourage you to contact your supervisor for further steps.

      You can access the platform for more details here: http://localhost:5173/dashboard/home

      Best regards,
      PFE Management Team
    `;

    setGeneratedEmail(emailMessage);
    setFormStatus("Encadrement assignment email configured successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
          Configure Encadrement Assignment Notification Email
        </h3>

        <div className="p-6">
          <form onSubmit={handleFormSubmit}>
            {/* Subject Input */}
            <div className="mb-4">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="PFE Encadrement Assignment Notification"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Professor Name Input */}
            <div className="mb-4">
              <label
                htmlFor="professorName"
                className="block text-sm font-medium text-gray-700"
              >
                Professor Name:
              </label>
              <input
                type="text"
                id="professorName"
                name="professorName"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Professor's Name"
                value={formData.professorName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Student Name Input */}
            <div className="mb-4">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Student's Name"
                value={formData.studentName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Enterprise Name Input */}
            <div className="mb-4">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Enterprise Name"
                value={formData.enterpriseName}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Title Input */}
            <div className="mb-4">
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Project Title"
                value={formData.projectTitle}
                onChange={handleInputChange}
                required
              />
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                rows="4"
                placeholder="Add any additional instructions or messages here..."
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              submit
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

          {/* Display Generated Email Message */}
          {generatedEmail && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold">
                Generated Email Preview:
              </h5>
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

export default EncadrementInvitationForm;
