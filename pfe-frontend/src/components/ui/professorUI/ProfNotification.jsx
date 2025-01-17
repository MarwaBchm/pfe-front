import React from "react";

const ProfNotification = ({ onClose }) => {
  const notifications = [
    "Your package has been shipped.",
    "New friend request received.",
    "Event reminder: Meeting at 3 PM.",
    "A new course has been assigned to you.",
  ];

  return (
    <div className="prof-notification">
      <h2>Professor Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
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
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <button onClick={onClose} className="edit-button">
        Edit
      </button>
    </div>
  );
};

export default ProfNotification