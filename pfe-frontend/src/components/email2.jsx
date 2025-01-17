import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
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
      You can access the platform here: <a>http://localhost:5173/dashboard/home</a>\n\n
      Best regards,\n
      GradMastery Team
    `;

    // Store the generated email message
    setGeneratedEmail(emailMessage);
    setFormStatus("Form submitted and email preview generated successfully!");
  };
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h4>Generate a password</h4>
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
                placeholder="Generate a password"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Type Checkbox */}
            <div className="mb-3">
              <label htmlFor="type" className="form-label">
                Send To:
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="student"
                  value="Student"
                  checked={formData.type.includes("Student")}
                  onChange={(e) => handleCheckboxChange(e, "Student")}
                />
                <label className="form-check-label" htmlFor="student">
                  Student
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="professor"
                  value="Professor"
                  checked={formData.type.includes("Professor")}
                  onChange={(e) => handleCheckboxChange(e, "Professor")}
                />
                <label className="form-check-label" htmlFor="professor">
                  Professor
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="enterprise"
                  value="Enterprise"
                  checked={formData.type.includes("Enterprise")}
                  onChange={(e) => handleCheckboxChange(e, "Enterprise")}
                />
                <label className="form-check-label" htmlFor="enterprise">
                  Enterprise
                </label>
              </div>
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
            <button type="submit" className="btn btn-primary w-100">
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

          {/* Display Generated Temporary Password */}
          {generatedPassword && (
            <div className="mt-3">
              <strong>Temporary Password:</strong> {generatedPassword}
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

export default AddUserForm;
