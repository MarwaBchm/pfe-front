import React, { useState } from "react";
import "./deadlines.css";
const Deadlines = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (day) => {
    setSelectedDate(`${day}/${currentMonth + 1}/${currentYear}`);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const days = [];

    // Empty days for spacing
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Render days of the month
    for (let day = 1; day <= totalDays; day++) {
      const dateString = `${day}/${currentMonth + 1}/${currentYear}`;
      days.push(
        <div
          key={day}
          className={`day ${selectedDate === dateString ? "selected" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>←</button>
        <div>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
          >
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
            ].map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
          >
            {[...Array(10)].map((_, index) => (
              <option key={index} value={2024 + index}>
                {2024 + index}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleNextMonth}>→</button>
      </div>
      <hr className="calendar-separator" />
      {/* Calendar Days */}
      <div className="calendar-grid">
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>

      {/* Selected and Upcoming Dates */}
      <div className="date-info">
        <div className="selected-date">
          <h4>Today's Deadline</h4>
          <hr className="calendar-separator" />
          {selectedDate ? (
            <p>{selectedDate}</p>
          ) : (
            <p>Select a date from the calendar</p>
          )}
        </div>

        <div className="upcoming-dates">
          <h4>Upcoming Dates</h4>
          <hr className="calendar-separator" />
          <ul>
            <li>15/11/2024</li>
            <li>17/11/2024</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deadlines;
