import React, { useState } from "react";
import AdminEmailSettings from "./Temail1";
import AddUserForm from "../components/email3";
import PFEEmailForm from "../components/email4";
import PFEReminderForm from "../components/email5";
import PFEEncadrementForm from "../components/email6";
import EncadrementInvitationForm from "../components/email7";
import PFEVALIDATION from "../components/email10";
import PFEEventNotification from "../components/email13";
import PFEEmailNotification from "../components/email12";

const OutlinedAlerts = () => {
  const [dynamicContent, setDynamicContent] = useState("default");

  const alertLinks = [
    { label: "Email Settings", key: "emailSettings" },
    { label: "Template Password", key: "templatepassword" },
    { label: "Configure PFE Call Email", key: "PFEEmailForm" },
    { label: "PFE Reminder Form", key: "pfereminder" },
    { label: "Encadrement Invitation Email", key: "encadrementinv" },
    { label: "Encadrement Invitation Form", key: "encadrementinvform" },
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

  const renderEmailForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-[500px] w-full mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Email Form
      </h3>
      <form>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-lg font-medium text-gray-700"
          >
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Subject of Your Email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="emails"
            className="block text-lg font-medium text-gray-700"
          >
            Recipient Emails (separate with commas):
          </label>
          <input
            type="text"
            id="emails"
            name="emails"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter recipient's emails"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">
            Send To:
          </label>
          <div className="flex space-x-4">
            {["Student", "Professor", "Enterprise"].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  className="mr-2"
                />
                <label htmlFor={type} className="text-sm">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="customMessage"
            className="block text-lg font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
            placeholder="Enter your message here"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
  const renderContent = () => {
    switch (dynamicContent) {
      case "emailSettings":
        return <AdminEmailSettings />;
      case "templatepassword":
        return <AddUserForm />;

      case "PFEEmailForm":
        return <PFEEmailForm />;
      case "pfereminder":
        return <PFEReminderForm />;
      case "encadrementinv":
        return <PFEEncadrementForm />;

      case "encadrementinvform":
        return <EncadrementInvitationForm />;
        
      case "pfeValidation":
        return <PFEVALIDATION />;
      case "pfeemailnotification":
        return <PFEEmailNotification />;
      case "pefeventnotification":
        return <PFEEventNotification />;

      default:
        return renderEmailForm();
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-1/3">
        <div className="space-y-4">
          {alertLinks.map((alert, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleTemplateClick(alert.key || alert.label)} // Use 'alert.key' directly here
            >
              <a href={alert.link || "#"} className="text-blue-600 font-bold">
                {alert.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default OutlinedAlerts;
