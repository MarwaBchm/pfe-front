import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [generatedEmail, setGeneratedEmail] = useState(""); // Nouveau state pour le message généré

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.studentName || !formData.projectTitle) {
      setFormStatus("Please fill in all the required fields.");
      return;
    }

    // Génération du message email
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

    // Mettre à jour le message généré
    setGeneratedEmail(emailMessage);
    setFormStatus("Non-selection notification email configured successfully!"); // Message de succès
  };
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-danger text-white text-center">
          <h4>Configure Non-Selection Notification Email</h4>
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
                placeholder="PFE Project Submission Status: Not Selected"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Student Name Input */}
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">
                Student Name:
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                className="form-control"
                placeholder="Enter Student's Name"
                value={formData.studentName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Enterprise Name Input */}
            <div className="mb-3">
              <label htmlFor="enterpriseName" className="form-label">
                Enterprise Name (optional):
              </label>
              <input
                type="text"
                id="enterpriseName"
                name="enterpriseName"
                className="form-control"
                placeholder="Enter Enterprise Name"
                value={formData.enterpriseName}
                onChange={handleInputChange}
              />
            </div>

            {/* Project Title Input */}
            <div className="mb-3">
              <label htmlFor="projectTitle" className="form-label">
                Project Title:
              </label>
              <input
                type="text"
                id="projectTitle"
                name="projectTitle"
                className="form-control"
                placeholder="Enter Project Title"
                value={formData.projectTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Reason for Non-Selection */}
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason for Non-Selection:
              </label>
              <textarea
                id="reason"
                name="reason"
                className="form-control"
                rows="3"
                placeholder="Enter the reason for non-selection"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
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
                placeholder="Add any additional message here..."
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-danger w-100">
              Generate Non-Selection Notification Email
            </button>
          </form>

          {/* Form Status (Message under the form) */}
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

          {/* Display Generated Email Message */}
          {generatedEmail && (
            <div className="mt-3">
              <h5>Generated Email Preview:</h5>
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

export default NonSelectionNotificationForm;
