import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-warning text-white text-center">
          <h4>Configure PFE Reminder Email</h4>
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
                placeholder="Reminder: Submit Your PFE Proposals"
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
            <button type="submit" className="btn btn-warning w-100">
              Generate Reminder Email Preview
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

export default PFEReminderForm;
