import React from "react";
import { FaCalendarAlt, FaAlignLeft, FaClock, FaEnvelope } from "react-icons/fa";
import CalendarPage from "./CalendarPage"; // Import CalendarPage
import "./defenseSchedule.css"; // Replace with your actual CSS

const App = () => {
  // Simulated user role (replace this logic with real authentication)
  const userRole = "admin"; // Change this value to "admin", "prof", "profresponsable", "entreprise", or "student"

  return (
    <div className="app-container">
      {userRole === "admin" ? <DefenseSchedule /> : <CalendarPage />}
    </div>
  );
};

const DefenseSchedule = () => {
  return (
    <div className="defense-schedule-container">
      <form className="defense-schedule-form">
        {/* Date Section */}
        <div className="form-group">
          <label htmlFor="date">
            <FaCalendarAlt className="icon" /> Date:
          </label>
          <div className="date-inputs">
            <select id="day" defaultValue="">
              <option value="" disabled>
                Day
              </option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select id="month" defaultValue="">
              <option value="" disabled>
                Month
              </option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, i) => (
                <option key={i} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select id="year" defaultValue="">
              <option value="" disabled>
                Year
              </option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description Section */}
        <div className="form-group">
          <label htmlFor="description">
            <FaAlignLeft className="icon" /> Description:
          </label>
          <textarea id="description" placeholder="Write here..." rows="4"></textarea>
        </div>

        {/* Time Section */}
        <div className="form-group">
          <label htmlFor="time">
            <FaClock className="icon" /> Time:
          </label>
          <input id="time" type="time" />
        </div>

        {/* Email Section */}
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="icon" /> Email:
          </label>
          <input id="email" type="email" placeholder="example@mail.com" />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="save-btn">
            Save
          </button>
          <button type="button" className="edit-btn">
            Edit
          </button>
          <button type="button" className="delete-btn">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
