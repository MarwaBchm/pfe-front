import React from "react";

const EntrepriseNotification = ({ onClose }) => {
  const notifications = [
    "Your proposal has been accepted.",
    "Check your deadline page.",
    "Submit the CSV file.",
  ];

  return (
    <div className="entreprise-notification">
      <h2>Entreprise Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
      <button onClick={onClose} className="close-button">
        Close
      </button>
      
      <button onClick={onClose} className="edit-button">
        Edit
      </button>

      {/* Styles */}
      <style jsx>{`
        .entreprise-notification {
          font-family: Arial, sans-serif;
        }
        h2 {
          margin-bottom: 15px;
          font-size: 18px;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
        .close-button {
          margin-top: 10px;
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .close-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default EntrepriseNotification;