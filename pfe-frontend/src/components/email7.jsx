import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const [generatedEmail, setGeneratedEmail] = useState(""); // État pour stocker l'email généré

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
    if (
      !formData.professorName ||
      !formData.studentName ||
      !formData.projectTitle
    ) {
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

    // Mettre à jour le message généré
    setGeneratedEmail(emailMessage);
    setFormStatus("Encadrement assignment email configured successfully!"); // Message de succès
  };
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-success text-white text-center">
          <h4>Configure Encadrement Assignment Notification Email</h4>
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
                placeholder="PFE Encadrement Assignment Notification"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Professor Name Input */}
            <div className="mb-3">
              <label htmlFor="professorName" className="form-label">
                Professor Name:
              </label>
              <input
                type="text"
                id="professorName"
                name="professorName"
                className="form-control"
                placeholder="Enter Professor's Name"
                value={formData.professorName}
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
                placeholder="Add any additional instructions or messages here..."
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100">
              Generate Encadrement Assignment Email
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

export default EncadrementInvitationForm;
