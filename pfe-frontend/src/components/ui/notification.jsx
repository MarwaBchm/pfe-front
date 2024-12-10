import React, { useState } from "react";
import ProfNotification from "./ProfNotification";
import StudentNotification from "./StudentNotification";
import ProfResponsableNotification from "./ProfResponsableNotification";
import EntrepriseNotification from "./EntrepriseNotification";
import AdminNotification from "./AdminNotification";

const NotificationPage = ({ isAdmin = false }) => {
  const users = {
    admin: [
      "Your package has been shipped.",
      "New friend request received.",
      "Event reminder: Meeting at 3 PM.",
    ],
    prof: [
      "Your package has been shipped.",
      "New friend request received.",
      "Event reminder: Meeting at 3 PM.",
    ],
    profresponsable: [
      "Your subscription is about to expire.",
      "System maintenance scheduled for tonight.",
    ],
    student: [
      "You have 5 unread messages.",
      "Your profile was viewed 10 times today.",
    ],
    entreprise: [
      "Your proposal has been accepted.",
      "Check your deadline page.",
      "Submit the CSV file.",
    ],
  };

  const [currentUser, setCurrentUser] = useState("admin");
  const [showPopup, setShowPopup] = useState(true); // Modal visibility

  // Render the appropriate notification popup
  const renderPopup = () => {
    switch (currentUser) {
      case "prof":
        return <ProfNotification onClose={() => setShowPopup(false)} />;
      case "student":
        return <StudentNotification onClose={() => setShowPopup(false)} />;
      case "profresponsable":
        return (
          <ProfResponsableNotification onClose={() => setShowPopup(false)} />
        );
      case "entreprise":
        return <EntrepriseNotification onClose={() => setShowPopup(false)} />;
      case "admin":
        return <AdminNotification onClose={() => setShowPopup(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className="notification-page">
      <h2>Notification Center</h2>

      {/* Notifications */}
      <div className="notifications">
        <h3>Notifications for {currentUser}</h3>
        <ul>
          {users[currentUser].map((notification, index) => (
            <li key={index}>
              <img
                src="/notificationring.jpeg" // Replace with the path to your notification icon
                alt="Notification Icon"
                className="notification-icon"
              />
              {notification}
            </li>
          ))}
        </ul>
      </div>

      {/* Show "View More" button */}
      <button
        onClick={() => setShowPopup(true)} // Open the popup on click
        className="view-more-button"
      >
        View More
      </button>

      {/* User Selection (Visible only to Admins) */}
      {isAdmin && (
        <div className="user-selector">
          <label>Select User: </label>
          <select
            value={currentUser}
            onChange={(e) => setCurrentUser(e.target.value)}
          >
            {Object.keys(users).map((user, index) => (
              <option key={index} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Modal Popup */}
      {showPopup && (
        <div
          className="modal-overlay"
          onClick={() => setShowPopup(false)} // Close modal on clicking the overlay
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closure on clicking inside modal
          >
            {renderPopup()}
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .notification-page {
          padding: 30px;
          font-family: Arial, sans-serif;
          margin: 0 auto;
          width: 300px;
          background-color: white;
          border-radius:30px;
          border:1px solid #ccc;
        }
        h2 {
          text-align: left;
          margin-bottom: 10px;
          color: #333;
        }
        .notifications {
          background-color: white;
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 20px;
          margin-bottom: 10px;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        li {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #ddd;
          font-size: 14px;
          color: #555;
        }
        li:last-child {
          border-bottom: none;
        }
        .notification-icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 30px;
        }
        .view-more-button {
          display: block;
          margin: 0 auto;
          padding: 10px 20px;
          background-color: #3a10e0;
          color: white;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        .view-more-button:hover {
          background-color: purple;
        }
        .user-selector {
          text-align: left;
          margin-top: 10px;
        }
        select {
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 30px;
          font-size: 14px;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 20px;
          width: 400px;
          max-height: 80vh;
          overflow-y: auto;
        }
        .close-button {
          color: white;
          background-color: #3a10e0;
          width: 70px;
          height: 30px;
          margin-top: 15px;
          border-radius: 30px;
          cursor: pointer;
        }
        .close-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default NotificationPage;
