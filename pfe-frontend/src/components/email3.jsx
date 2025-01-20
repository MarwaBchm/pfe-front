import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    subject: "Generate a password",
    customMessage: "",
    type: [],
  });
  const navigate = useNavigate();
  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // Store the generated email preview
  const [generatedPassword, setGeneratedPassword] = useState(""); // Store generated password

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

    if (!formData.subject || formData.type.length === 0) {
      setFormStatus("Please fill in the subject and select at least one type.");
      return;
    }

    // Generate the temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    setGeneratedPassword(tempPassword);

    // Generate the email content
    const emailMessage = `
      Hello ${formData.type.join(", ")},\n\n
      Welcome to GradMastery! Here are the details of your submission:\n\n
      Subject: ${formData.subject}\n
      Selected Types: ${
        formData.type.length > 0 ? formData.type.join(", ") : "None"
      }\n\n
      Your temporary password is: ${tempPassword}\n\n
      Please change it after logging in.\n\n
      You can access the platform here: http://localhost:5173/dashboard/home\n\n
      Best regards,\n
      GradMastery Team
    `;

    // Store the generated email message
    setGeneratedEmail(emailMessage);
    setFormStatus("Form submitted and email preview generated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Generate a password
      </h3>

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
            className="mt-2 p-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Generate a password"
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
          <div className="flex flex-wrap gap-4">
            {["Student", "Professor", "Enterprise"].map((type) => (
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
            className="mt-2 p-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
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
          className={`mt-3 p-4 rounded-lg text-center ${
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
          <h5 className="text-xl font-semibold text-gray-800">
            Email Preview:
          </h5>
          <div className="mt-2 p-4 bg-gray-100 border rounded-lg">
            <pre className="whitespace-pre-wrap break-words text-gray-800">
              {generatedEmail}
            </pre>
          </div>
        </div>
      )}

      {/* Display Generated Temporary Password */}
      {generatedPassword && (
        <div className="mt-6 text-lg font-semibold">
          <span className="text-gray-800">Temporary Password:</span>{" "}
          {generatedPassword}
        </div>
      )}
    </div>
  );
};

export default AddUserForm;
