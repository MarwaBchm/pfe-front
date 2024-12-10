import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const styles = {
  calendarPage: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  calendarContainer: {
    flex: 1,
    maxWidth: "50%",
    marginRight: "20px",
  },
  customCalendar: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  deadlinesContainer: {
    flex: 1,
    maxWidth: "50%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  deadlineItem: {
    marginBottom: "15px",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  lastDeadlineItem: {
    borderBottom: "none",
  },
  deadlineTitle: {
    margin: "0 0 5px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  deadlineText: {
    margin: "5px 0",
    fontSize: "0.9rem",
    color: "#555",
  },
  highlightDate: {
    backgroundColor: "#ffc107",
    color: "#000",
    borderRadius: "50%",
    padding: "5px 8px",
  },
};

const CalendarPage = ({ role }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load deadlines from localStorage on component mount
  useEffect(() => {
    const storedDeadlines = localStorage.getItem("deadlines");
    if (storedDeadlines) {
      setDeadlines(JSON.parse(storedDeadlines));
    }
  }, []);

  // Filter deadlines based on the selected date
  const filteredDeadlines = deadlines.filter(
    (deadline) => deadline.dueDate === selectedDate.toISOString().split("T")[0]
  );

  // Highlight dates with deadlines
  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      const hasDeadline = deadlines.some((d) => d.dueDate === formattedDate);
      return hasDeadline ? styles.highlightDate : null;
    }
    return null;
  };

  // Restrict access based on role
  if (!["student", "prof", "profresponsable", "company"].includes(role)) {
    return <h1>Access Denied</h1>;
  }

  return (
    <div style={styles.calendarPage}>
      {/* Calendar Section */}
      <div style={styles.calendarContainer}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={getTileClassName}
          style={styles.customCalendar}
        />
      </div>

      {/* Deadlines Section */}
      <div style={styles.deadlinesContainer}>
        <h2>Deadlines for {selectedDate.toDateString()}</h2>
        {filteredDeadlines.length > 0 ? (
          filteredDeadlines.map((deadline, index) => (
            <div
              key={index}
              style={{
                ...styles.deadlineItem,
                ...(index === filteredDeadlines.length - 1
                  ? styles.lastDeadlineItem
                  : {}),
              }}
            >
              <h3 style={styles.deadlineTitle}>{deadline.theme}</h3>
              <p style={styles.deadlineText}>{deadline.description}</p>
              <p style={styles.deadlineText}>
                <strong>Due Date:</strong> {deadline.dueDate}
              </p>
              <p style={styles.deadlineText}>
                <strong>Time:</strong> {deadline.time}
              </p>
              <p style={styles.deadlineText}>
                <strong>Assigned Role:</strong> {deadline.role}
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

const App = () => {
  // Simulating user role
  const userRole = "prof"; // Change this to test different roles

  return <CalendarPage role={userRole} />;
};

export default App;
