import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminEmailSettings = () => {
  const [formData, setFormData] = useState({
    emailStartDate: "",
    emailReminderDates: "",
    formClosureDate: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { emailStartDate, emailReminderDates, formClosureDate } = formData;

    // Validation
    if (!emailStartDate || !emailReminderDates || !formClosureDate) {
      setFormStatus("All fields are required.");
      return;
    }

    const currentDate = new Date();
    const startDate = new Date(emailStartDate);
    const closureDate = new Date(formClosureDate);

    if (startDate <= currentDate) {
      setFormStatus("The email start date must be in the future.");
      return;
    }

    if (startDate > closureDate) {
      setFormStatus(
        "The email start date cannot be after the form closure date."
      );
      return;
    }

    if (closureDate < currentDate) {
      setFormStatus("The closure date cannot be in the past.");
      return;
    }

    const reminderDatesArray = emailReminderDates
      .split(",")
      .map((date) => date.trim());
    for (let dateStr of reminderDatesArray) {
      const reminderDate = new Date(dateStr);
      if (isNaN(reminderDate)) {
        setFormStatus(`Invalid reminder date format: ${dateStr}`);
        return;
      }
      if (reminderDate < currentDate) {
        setFormStatus(`Reminder date ${dateStr} cannot be in the past.`);
        return;
      }
    }

    setFormStatus("Settings saved successfully!");
    console.log("Form Data Submitted:", formData);
  };

  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/");
  };

  return (
    <div className="email-settings">
      <h3 className="email-settings-title">Automatic Email Settings</h3>
      <form onSubmit={handleFormSubmit} className="email-settings-form">
        <div className="form-group">
          <label>Email Start Date:</label>
          <input
            type="date"
            name="emailStartDate"
            value={formData.emailStartDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email Reminder Dates (comma-separated):</label>
          <input
            type="text"
            name="emailReminderDates"
            placeholder="e.g., 2024-12-10, 2024-12-20"
            value={formData.emailReminderDates}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Form Closure Date:</label>
          <input
            type="date"
            name="formClosureDate"
            value={formData.formClosureDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
      <button
        onClick={handleReviewPageClick}
        className="btn btn-secondary review-button"
      >
        Go to Review Page
      </button>
    </div>
  );
};

export default AdminEmailSettings;
