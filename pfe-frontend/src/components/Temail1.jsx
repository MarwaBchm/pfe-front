import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

    // Validation
    const { emailStartDate, emailReminderDates, formClosureDate } = formData;
    if (!emailStartDate || !emailReminderDates || !formClosureDate) {
      setFormStatus("All fields are required.");
      return;
    }

    const currentDate = new Date();
    const startDate = new Date(emailStartDate);
    const closureDate = new Date(formClosureDate);

    // Check if email start date is after the current date
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

    // Validate email reminder dates (comma-separated dates)
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

    // Simulate saving data (e.g., sending to the backend)
    console.log("Form Data Submitted:", formData);
    setFormStatus("Settings saved successfully!");
  };
  const handleReviewPageClick = () => {
    navigate("/dashboard/emails/"); // This will navigate to the /review page
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Automatic Email Settings</h2>
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h4>Configure Email and Form Submission Settings</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            {/* Email Start Date */}
            <div className="mb-3">
              <label htmlFor="emailStartDate" className="form-label">
                Email Start Date:
              </label>
              <input
                type="date"
                id="emailStartDate"
                name="emailStartDate"
                className="form-control"
                value={formData.emailStartDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email Reminder Dates */}
            <div className="mb-3">
              <label htmlFor="emailReminderDates" className="form-label">
                Email Reminder Dates (comma-separated):
              </label>
              <input
                type="text"
                id="emailReminderDates"
                name="emailReminderDates"
                className="form-control"
                placeholder="e.g., 2024-12-10, 2024-12-20"
                value={formData.emailReminderDates}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Form Closure Date */}
            <div className="mb-3">
              <label htmlFor="formClosureDate" className="form-label">
                Form Closure Date:
              </label>
              <input
                type="date"
                id="formClosureDate"
                name="formClosureDate"
                className="form-control"
                value={formData.formClosureDate}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Save Settings
            </button>
          </form>

          {/* Status Feedback */}
          {formStatus && (
            <div
              className={`mt-3 alert ${
                formStatus.includes("success")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {formStatus}
            </div>
          )}
          <button
            onClick={handleReviewPageClick}
            className="btn btn-secondary w-100 mt-3"
          >
            Go to Review Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEmailSettings;
