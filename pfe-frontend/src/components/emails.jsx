import React, { useState } from "react";
import AdminEmailSettings from "./Temail1"; // Replace with the correct path for AdminEmailSettings
import "./emails.css";

const OutlinedAlerts = () => {
  const [dynamicContent, setDynamicContent] = useState("default");

  const alertLinks = [
    { label: "Email Settings", key: "emailSettings" },
    { label: "Configure PFE Call Email", key: "default" },
    // Add more alerts as needed
  ];

  const handleLinkClick = (key) => {
    setDynamicContent(key);
  };

  const renderEmailForm = () => (
    <div className="form-container">
      <h3>Email Form</h3>
      <form>
        {/* Subject Input */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-input"
            placeholder="Subject of Your Email"
          />
        </div>

        {/* Recipient Emails Input */}
        <div className="form-group">
          <label htmlFor="emails" className="form-label">
            Recipient Emails (separate with commas):
          </label>
          <input
            type="text"
            id="emails"
            name="emails"
            className="form-input"
            placeholder="Enter recipient's emails"
          />
        </div>

        {/* Recipient Type Checkboxes */}
        <div className="form-group">
          <label className="form-label">Send To:</label>
          <div className="checkbox-row">
            {["Student", "Professor", "Enterprise"].map((type) => (
              <div key={type} className="checkbox-group">
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  className="checkbox-input"
                />
                <label htmlFor={type} className="checkbox-label">{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Message Textarea */}
        <div className="form-group">
          <label htmlFor="customMessage" className="form-label">Message:</label>
          <textarea
            id="customMessage"
            name="customMessage"
            className="form-input"
            rows="4"
            placeholder="Enter your message here"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );

  const renderDynamicContent = () => {
    switch (dynamicContent) {
      case "emailSettings":
        return <AdminEmailSettings />;
      default:
        return renderEmailForm();
    }
  };

  return (
    <div className="container">
      {/* Alert Section */}
      <div className="alert-section">
        <div className="row">
          {alertLinks.map((alert, index) => (
            <div
              key={index}
              className="alert-item"
              onClick={() => handleLinkClick(alert.key)}
            >
              <div className="alert-box">
                <a href="#" className="alert-link">
                  {alert.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="form-section">
        {renderDynamicContent()}
      </div>
    </div>
  );
};

export default OutlinedAlerts;
