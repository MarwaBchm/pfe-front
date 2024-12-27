import React, { useState } from "react";
import "./emails.css";

const OutlinedAlerts = () => {
  const [dynamicContent, setDynamicContent] = useState("form");

  const alertLinks = [
    { label: "Email Settings", link: "http://localhost:5173/email1/" },
    { label: "Template Password", link: "http://localhost:5173/email3/" },
    { label: "Configure PFE Call Email", link: "#" },
    { label: "PFE Reminder Form", link: "http://localhost:5173/email5/" },
    { label: "Encadrement Invitation Email", link: "http://localhost:5173/email6/" },
    { label: "Encadrement Invitation Form", link: "http://localhost:5173/email7/" },
    { label: "Non-Selection Notification Form", link: "http://localhost:5173/email8/" },
    { label: "PFE Proposal Form", link: "http://localhost:5173/email9/" },
    { label: "PFE Validation", link: "http://localhost:5173/email10/" },
    { label: "PFE Email Notification", link: "http://localhost:5173/email11/" },
    { label: "Jury Assignment Notification", link: "http://localhost:5173/email12/" },
    { label: "PFE Event Notification", link: "http://localhost:5173/email13/" },
  ];

  const templateList = [
    { id: 1, title: "Template 1", description: "Details for template 1." },
    { id: 2, title: "Template 2", description: "Details for template 2." },
    { id: 3, title: "Template 3", description: "Details for template 3." },
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
      <h3>Email Form</h3>
      <p>This is the placeholder for the email form.</p>
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
              onClick={() => handleTemplateClick(alert.label)}
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
        {dynamicContent === "Configure PFE Call Email"
          ? renderTemplateList()
          : dynamicContent === "form"
          ? renderEmailForm()
          : (
            <div className="form-container">
              <h3>{dynamicContent}</h3>
              <p>Custom content for {dynamicContent}.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default OutlinedAlerts;
