import React, { useState } from "react";
import "./AdminNotification.css";

const AdminNotification = () => {
  const [gmail, setGmail] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("prof");
  const [notifications, setNotifications] = useState([]);

  // Handle form submission (Send Notification)
  const handleSend = (e) => {
    e.preventDefault();
    if (!gmail || !description || !recipient) {
      alert("Please fill in all fields!");
      return;
    }
    setNotifications([
      ...notifications,
      { id: Date.now(), gmail, description, recipient },
    ]);
    setGmail("");
    setDescription("");
    setRecipient("prof");
  };

  // Handle Delete Notification
  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Handle Edit Notification
  const handleEdit = (id) => {
    const notificationToEdit = notifications.find((notification) => notification.id === id);
    setGmail(notificationToEdit.gmail);
    setDescription(notificationToEdit.description);
    setRecipient(notificationToEdit.recipient);
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="admin-notification-page">
      <h2><strong>Admin Notification Center</strong></h2>

      {/* Form Section */}
      <form className="notification-form" onSubmit={handleSend}>
        <div className="form-group">
          <label htmlFor="gmail">Gmail:</label>
          <input
            type="email"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="Enter Gmail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter notification description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="recipient">To:</label>
          <select
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="prof">Professor</option>
            <option value="profresponsable">Professor Responsable</option>
            <option value="entreprise">Entreprise</option>
          </select>
        </div>
        <button type="submit" className="send-button">Send</button>
      </form>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <div className="notification-list">
          <h3>Saved Notifications</h3>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <div className="notification-content">
                  <p><strong>To:</strong> {notification.recipient}</p>
                  <p><strong>Gmail:</strong> {notification.gmail}</p>
                  <p><strong>Description:</strong> {notification.description}</p>
                </div>
                <div className="notification-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(notification.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(notification.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default AdminNotification;
