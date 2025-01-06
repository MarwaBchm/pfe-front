import React, { useState } from "react";
import AdminEmailSettings from "./Temail1";
import PFEVALIDATION from "../components/email10";
import PFEEventNotification from "../components/email13";
import PFEEmailNotification from "../components/email12";

import "./emails.css";

const OutlinedAlerts = () => {
  const [dynamicContent, setDynamicContent] = useState("default");

  const alertLinks = [
    { label: "Email Settings", key: "emailSettings" },
    { label: "Template Password", link: "http://localhost:5173/email3/" },
    { label: "Configure PFE Call Email", link: "" },





















































    
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
    { label: "PFE Validation", key: "pfeValidation" },
    { label: "PFE Email Notification", link: "http://localhost:5173/email11/" },
    {
      label: "Jury Assignment Notification",
      key: "pfeemailnotification",
    },

    { label: "PFE Event Notification", key: "pefeventnotification" },
  ];

  const handleTemplateClick = (template) => {
    setDynamicContent(template);
  };

  const renderTemplateList = () => (
    <div className="template-list">
      {templateList.map((template) => (
        <div key={template.id} className="template-item">
          <h5>{template.title}</h5>
          <p>{template.description}</p>
          <button className="btn-primary">Select</button>
        </div>
      ))}
    </div>
  );

  const renderEmailForm = () => (
    <div className="form-container">
      {/* <h3>Email Form</h3> */}
      <form>
        {/* Subject Input */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject:
          </label>
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
                <label htmlFor={type} className="checkbox-label">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Message Textarea */}
        <div className="form-group">
          <label htmlFor="customMessage" className="form-label">
            Message:
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            className="form-input"
            rows="4"
            placeholder="Enter your message here"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div className="container">
      {/* Alert Section */}
      <div className="alert-section">
        <div className="row">
          {alertLinks.map((alert, index) => (
            <div
              key={index}
              className="alert-item"
              onClick={() => handleTemplateClick(alert.key || alert.label)}
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
        {dynamicContent === "Configure PFE Call Email" ? (
          renderTemplateList()
        ) : dynamicContent === "form" ? (
          renderEmailForm()
        ) : dynamicContent === "emailSettings" ? (
          <AdminEmailSettings />
        ) : dynamicContent === "pfeValidation" ? (
          <PFEVALIDATION />
        ) : dynamicContent === "pfeemailnotification" ? (
          <PFEEmailNotification />
        ) : dynamicContent === "pefeventnotification" ? (
          <PFEEventNotification />
        ) : (
          renderEmailForm()
        )}
      </div>
    </div>
  );
};

export default OutlinedAlerts;
