import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./emails.css";

const OutlinedAlerts = () => {
  const [formData, setFormData] = useState({
    subject: "PFE Email",
    customMessage: "",
    type: [],
  });

  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");

  const alertLinks = [
    { label: "Email Settings", link: "http://localhost:5173/email1/" },
    { label: "Template Password", link: "http://localhost:5173/email3/" },
    {
      label: "Configure PFE Call Email",
      link: "http://localhost:5173/email2/",
    },
    { label: "PFE Reminder Form", link: "http://localhost:5173/email5/" },
    {
      label: "Encadrement Invitation Email",
      link: "http://localhost:5173/email6/",
    },
    {
      label: "Encadrement Invitation Form",
      link: "http://localhost:5173/email7/",
    },
    {
      label: "Non-Selection Notification Form",
      link: "http://localhost:5173/email8/",
    },
    { label: "PFE Proposal Form", link: "http://localhost:5173/email9/" },
    { label: "PFE Validation", link: "http://localhost:5173/email10/" },
    { label: "PFE Email Notification", link: "http://localhost:5173/email11/" },
    {
      label: "Jury Assignment Notification",
      link: "http://localhost:5173/email12/",
    },
    { label: "PFE Event Notification", link: "http://localhost:5173/email13/" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { checked } = e.target;
    setFormData((prevData) => {
      const newTypes = checked
        ? [...prevData.type, type]
        : prevData.type.filter((item) => item !== type);
      return { ...prevData, type: newTypes };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || formData.type.length === 0) {
      setFormStatus("Please fill in all the required fields.");
      return;
    }

    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear ${formData.type.join(", ") || "Recipient"},

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      You can access the platform for more details here: http://localhost:5173/dashboard/home

      Best regards,
      PFE Management Team
    `;

    setGeneratedEmail(emailMessage);
    setFormStatus("Email configuration successful!");
  };

  return (
    <div className="container">
      {/* Alert Section */}
      <div className="alert-section">
        <div className="row">
          {alertLinks.map((alert, index) => (
            <div key={index} className="alert-item">
              <div className="alert-box">
                <a href={alert.link} className="alert-link">
                  {alert.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          <div className="form-card">
            <div className="form-header">
              <h4>Send Email</h4>
            </div>
            <div className="form-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    placeholder="Subject of Your Inquiry"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
  
                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    Send To:
                  </label>
                  {["Student", "Professor", "Enterprise"].map((type) => (
                    <div key={type} className="checkbox-group">
                    <input
                      className="checkbox-input"
                      type="checkbox"
                      id={type}
                      value={type}
                      checked={formData.type.includes(type)}
                      onChange={(e) => handleCheckboxChange(e, type)}
                    />
                    <label htmlFor={type} className="checkbox-label">{type}</label>
                  </div>
                  ))}
                </div>
  
                <div className="form-group">
                  <label htmlFor="customMessage" className="form-label">
                    Message:
                  </label>
                  <textarea
                    id="customMessage"
                    name="customMessage"
                    className="form-input"
                    rows="4"
                    value={formData.customMessage}
                    onChange={handleInputChange}
                  />
                </div>
  
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              </form>
  
              {formStatus && (
                <div
                  className={`alert-box ${
                    formStatus.includes("successful")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {formStatus}
                </div>
              )}
  
              {generatedEmail && (
                <div className="email-preview">
                  <h5>Generated Email Preview:</h5>
                  <div className="alert-box alert-secondary">
                    <pre>{generatedEmail}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default OutlinedAlerts;
