import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PFEReminderForm = () => {
  const [formData, setFormData] = useState({
    subject: "Reminder: Submit Your PFE Proposals",
    customMessage: "",
    type: [],
  });
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // State to store the generated email preview

  // Define the available project types
  const projectTypes = ["Student", "Professor", "Enterprise"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, value) => {
    setFormData((prevData) => {
      const updatedType = e.target.checked
        ? [...prevData.type, value]
        : prevData.type.filter((item) => item !== value);
      return { ...prevData, type: updatedType };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject) {
      setFormStatus("Please provide a subject for the email.");
      return;
    }

    // Generate the email content
    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear Professor,

      This is a friendly reminder to submit your PFE proposals for the current session.

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      The deadline is approaching, so please submit your proposals as soon as possible.

      Selected Project Types: ${formData.type.join(", ") || "None selected"}

      You can access the submission portal here: http://localhost:5173/dashboard/home.

      Best regards,
      PFE Management Team
    `;

    // Store the generated email message
    setGeneratedEmail(emailMessage);
    setFormStatus(
      "Reminder email configured successfully! Check below for the preview."
    );
  };

  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Configure PFE Reminder Email
      </h3>

      <div className="p-6">
        <form onSubmit={handleFormSubmit}>
          {/* Subject Input */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-lg font-medium text-gray-700"
            >
              Email Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Reminder: Submit Your PFE Proposals"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Type Checkbox */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Send To:
            </label>
            <div className="flex flex-wrap gap-4 mt-2">
              {projectTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={formData.type.includes(type)}
                    onChange={(e) => handleCheckboxChange(e, type)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={type}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Message Input */}
          <div className="mb-4">
            <label
              htmlFor="customMessage"
              className="block text-lg font-medium text-gray-700"
            >
              Custom Message (optional):
            </label>
            <textarea
              id="customMessage"
              name="customMessage"
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="4"
              placeholder="Add any additional instructions or reminders here..."
              value={formData.customMessage}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Form Status */}
        {formStatus && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
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
            <h5 className="text-lg font-semibold text-gray-800">
              Email Preview:
            </h5>
            <div className="mt-2 p-4 bg-gray-100 border rounded-lg">
              <pre className="whitespace-pre-wrap break-words text-gray-800">
                {generatedEmail}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PFEReminderForm;
