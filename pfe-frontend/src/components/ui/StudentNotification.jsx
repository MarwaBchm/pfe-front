import React from "react";

const StudentNotification = ({ onClose }) => {
  const notifications = [
    "You have 5 unread messages.",
    "Your profile was viewed 10 times today.",
    "A new assignment has been uploaded.",
  ];

  return (
    <div className="student-notification">
      <h2>Student Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
         <div>
          <li key={index}>
              <img
                src="/notificationring.jpeg" // Replace with the path to your notification icon
                alt="Notification Icon"
                className="notification-icon"
              />
              {notification}
            </li></div>
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

export default StudentNotification;