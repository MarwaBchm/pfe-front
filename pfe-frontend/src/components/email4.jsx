import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PFEEmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "Call for PFE Proposals",
    type: [],
    customMessage: "",
  });
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [emailPreview, setEmailPreview] = useState(""); // Store generated email preview

  const projectTypes = ["Students", "Professors", "Enterprise"];

  const handleCheckboxChange = (e, type) => {
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      type: isChecked
        ? [...prevData.type, type]
        : prevData.type.filter((item) => item !== type),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || formData.type.length === 0) {
      setFormStatus(
        "Please fill in the subject and select at least one acteur."
      );
      return;
    }

    const emailContent = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear ${formData.type},

      We are pleased to invite you to submit proposals for PFE projects for the upcoming academic session.

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      Access the platform to submit your proposals here: http://localhost:5173/dashboard/home.

      Best regards,
      PFE Management Team
    `;

    setEmailPreview(emailContent); // Set the generated email preview
    setFormStatus(
      "Email configured successfully! Check below for the preview."
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Configure PFE Call Email
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
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Checkbox Options */}
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
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              rows="4"
              placeholder="Add any additional information here..."
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

        {/* Email Preview */}
        {emailPreview && (
          <div className="mt-6">
            <h5 className="text-lg font-semibold text-gray-800">
              Email Preview:
            </h5>
            <div className="mt-2 p-4 bg-gray-100 border rounded-lg">
              <pre className="whitespace-pre-wrap break-words text-gray-800">
                {emailPreview}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PFEEmailForm;
