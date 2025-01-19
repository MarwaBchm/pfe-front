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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Automatic Email Settings
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700">
            Email Start Date:
          </label>
          <input
            type="date"
            name="emailStartDate"
            value={formData.emailStartDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700">
            Email Reminder Dates (comma-separated):
          </label>
          <input
            type="text"
            name="emailReminderDates"
            placeholder="e.g., 2024-12-10, 2024-12-20"
            value={formData.emailReminderDates}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="form-group">
          <label className="block text-lg font-medium text-gray-700">
            Form Closure Date:
          </label>
          <input
            type="date"
            name="formClosureDate"
            value={formData.formClosureDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Save Settings
        </button>
      </form>

      {formStatus && (
        <p className="mt-4 text-center text-lg font-medium text-green-600">
          {formStatus}
        </p>
      )}

      {/* <button
        onClick={handleReviewPageClick}
        className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition duration-200"
      >
        Go to Review Page
      </button> */}
    </div>
  );
};

export default AdminEmailSettings;
