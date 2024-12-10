import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h4>Configure PFE Call Email</h4>
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
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Checkbox Options */}
            <div className="mb-3">
              <label className="form-label">Send To :</label>
              {projectTypes.map((type) => (
                <div className="form-check" key={type}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={formData.type.includes(type)}
                    onChange={(e) => handleCheckboxChange(e, type)}
                  />
                  <label className="form-check-label" htmlFor={type}>
                    {type}
                  </label>
                </div>
              ))}
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
                placeholder="Add any additional information here..."
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

          {/* Email Preview */}
          {emailPreview && (
            <div className="mt-4">
              <h5>Email Preview:</h5>
              <div className="alert alert-secondary">
                <pre>{emailPreview}</pre>
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

export default PFEEmailForm;
