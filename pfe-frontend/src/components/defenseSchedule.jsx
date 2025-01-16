import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaAlignLeft, FaClock, FaEnvelope, FaUser } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./defenseSchedule.css";

const App = () => {
  const userRole = "prof"; // Change to "admin", "prof", "profresponsable", "entreprise", or "student"

  return (
    <div className="app-container">
      {userRole === "admin" ? <DefenseSchedule /> : <CalendarPage />}
    </div>
  );
};

// DefenseSchedule Component (Admin Page)
const DefenseSchedule = () => {
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
    description: "",
    time: "",
    email: "",
    juryNames: ["", "", "", "", ""],
    to: "", // New "to" field
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleJuryNameChange = (index, value) => {
    const updatedJuryNames = [...formData.juryNames];
    updatedJuryNames[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      juryNames: updatedJuryNames,
    }));
  };

  const handleSave = () => {
    const { day, month, year, description, time, email, juryNames, to } = formData;

    if (!day || !month || !year || !description || !time || !email || !to) {
      alert("Please fill out all fields.");
      return;
    }

    const dueDate = new Date(`${month} ${day}, ${year}`).toISOString().split("T")[0];

    const newDeadline = {
      theme: "Defense Schedule",
      description,
      dueDate,
      time,
      email,
      juryNames: juryNames.filter((name) => name.trim() !== ""),
      role: to, // Save the recipient role
    };

    const storedDeadlines = JSON.parse(localStorage.getItem("deadlines")) || [];
    localStorage.setItem("deadlines", JSON.stringify([...storedDeadlines, newDeadline]));

    alert("Deadline saved successfully!");
    setFormData({
      day: "",
      month: "",
      year: "",
      description: "",
      time: "",
      email: "",
      juryNames: ["", "", "", "", ""],
      to: "",
    });
  };

  return (
    <div className="defense-schedule-container">
      <form className="defense-schedule-form">
        {/* Date Inputs */}
        <div className="form-group">
          <label htmlFor="date">
            <FaCalendarAlt className="icon" /> Date:
          </label>
          <div className="date-inputs">
            <select id="day" value={formData.day} onChange={handleInputChange}>
              <option value="" disabled>
                Day
              </option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select id="month" value={formData.month} onChange={handleInputChange}>
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
            <select id="year" value={formData.year} onChange={handleInputChange}>
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

        {/* Jury Members */}
        <div className="form-group">
          <label>
            Jury Members (Max 5):
          </label>
          {formData.juryNames.map((name, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              <input
                type="text"
                placeholder={`Jury Member ${index + 1}`}
                value={name}
                onChange={(e) => handleJuryNameChange(index, e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            <FaAlignLeft className="icon" /> Description:
          </label>
          <textarea
            id="description"
            placeholder="Write here..."
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Time */}
        <div className="form-group">
          <label htmlFor="time">
            <FaClock className="icon" /> Time:
          </label>
          <input
            id="time"
            type="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="icon" /> Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* To Selection */}
        <div className="form-group">
          <label htmlFor="to">
            <FaUser className="icon" /> To:
          </label>
          <select id="to" value={formData.to} onChange={handleInputChange}>
            <option value="" disabled>
              Select recipient
            </option>
            <option value="prof">Professor</option>
            <option value="profresponsable">Responsible Professor</option>
            <option value="student">Student</option>
            <option value="company">Company</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="form-actions">
          <button type="button" className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

// CalendarPage Component
const CalendarPage = () => {
  const [deadlines, setDeadlines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const storedDeadlines = JSON.parse(localStorage.getItem("deadlines")) || [];
    setDeadlines(storedDeadlines);
  }, []);

  const filteredDeadlines = deadlines.filter(
    (deadline) => deadline.dueDate === selectedDate.toISOString().split("T")[0]
  );

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const hasDeadline = deadlines.some((d) => d.dueDate === formattedDate);

      if (hasDeadline) {
        return "deadline-date"; // Class for dates with deadlines
      }
    }
    return null;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ flex: 1, maxWidth: "50%", marginRight: "20px" }}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={getTileClassName}
        />
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: "50%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Deadlines for {selectedDate.toDateString()}</h2>
        {filteredDeadlines.length > 0 ? (
          filteredDeadlines.map((deadline, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h3>{deadline.theme}</h3>
              <p>{deadline.description}</p>
              <p>
                <strong>Time:</strong> {deadline.time}
              </p>
              <p>
                <strong>Email:</strong> {deadline.email}
              </p>
            </div>
          ))
        ) : (
          <p>No deadlines for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default App;
