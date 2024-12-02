import React from "react";

const ProfResponsableNotification = ({ notifications }) => {
  return (
    <div className="profresponsable-notification">
      <h2>Professor Responsable Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <img
              src="/notificationring.jpeg"
              alt="Notification Icon"
              className="notification-icon"
            />
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfResponsableNotification;
