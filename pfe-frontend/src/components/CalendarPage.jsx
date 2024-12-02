import React, { useState } from "react";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const tasks = [
    { date: "03/11/2024", time: "9:00", description: "Submit the profile" },
    { date: "13/11/2024", time: "9:00", description: "Choose the PFE subject" },
    { date: "15/11/2024", time: "9:00", description: "Propose the innovate topic" },
    { date: "17/11/2024", time: "9:00", description: "Confirm the chosen subject" },
    { date: "28/11/2024", time: "9:00", description: "Submit the project group" },
  ];

  const highlightDates = ["3", "13", "15", "17", "28"];

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const calendarDays = Array.from({ length: firstDayIndex }, () => "").concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Calendar Section */}
        <div style={styles.calendar}>
          <div style={styles.calendarHeader}>
            <button style={styles.arrowButton} onClick={goToPreviousMonth}>
              {"<-"}
            </button>
            <h2>
              {currentMonth} {currentYear}
            </h2>
            <button style={styles.arrowButton} onClick={goToNextMonth}>
              {"->"}
            </button>
          </div>
          <div style={styles.separator}></div>
          <div style={styles.calendarGrid}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} style={styles.dayName}>
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                style={{
                  ...styles.day,
                  ...(highlightDates.includes(day.toString()) ? styles.highlightedDay : {}),
                  ...(day === "" ? { backgroundColor: "transparent" } : {}),
                }}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Line */}
        <div style={styles.verticalLine}>
          {tasks.map((_, index) => (
            <div key={index} style={{ ...styles.taskCircle, top: `${index * 50}px` }}>
              {index + 1}
            </div>
          ))}
        </div>

        {/* Task List Section */}
        <div style={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} style={styles.taskItem}>
              <div>
                <p style={styles.taskDate}>
                  {task.date} - {task.time}
                </p>
                <p style={styles.taskDesc}>{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  calendar: {
    backgroundColor: "#ffff",
    borderRadius: "30px",
    boxShadow: "15px 15px 20px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    height:"500px",
    width: "600px", // Increased width
    position: "relative",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "30px",
    color: "#4318FF",
    backgroundColor: "#F4F7FE",
    borderRadius: "30px",
    padding: "10px", // Added padding for better spacing
  },
  separator: {
    borderBottom: "2px solid #dddddd",
    margin: "20px 0", // Increased margin to enhance spacing
  },
  arrowButton: {
    backgroundColor: "#9747FF",
    border: "none",
    borderRadius: "30px",
    fontSize: "30px",
    color: "#1F3083",
    cursor: "pointer",
    width:"70px",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
  },
  dayName: {
    fontWeight: "bold",
    color: "#2B3674",
    marginBottom: "40px",
    fontSize:"20px",
  },
  day: {
    padding: "10px",
    borderRadius: "50%",
    color: "#2B3674",
    fontWeight:"bold",
    fontSize:"20px",
  },
  highlightedDay: {
    backgroundColor: "#83BD66",
    color: "#ffff",
    width:"30px",
  },
  verticalLine: {
    width: "10px",
    backgroundColor: "#0052CC",
    height: "100%",
    borderRadius:"10px",
    position: "relative",
    margin: "20px 20px",
  },
  taskCircle: {
    width: "35px",
    height: "35px",
    backgroundColor: "#83BD66",
    color: "#83BD66",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    fontWeight: "bold",
    fontSize: "14px",
    position: "relative", // Adjusted to better align with spacing needs
    margin: "30px auto", // Set a consistent vertical margin
    transform: "translateX(-40%)", // Center the circle horizontally if needed
  },
  
  taskList: {
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    height:"500px",
    width: "250px", // Smaller width compared to the calendar
  },
  taskItem: {
    backgroundColor: "#CACDFF",
    border: "0px solid #6c63ff",
    padding: "10px",
    borderRadius: "30px",
    margin: "10px",
    width:"200px",
    height:"70px",
  },
  taskDate: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#1B2559",
  },
  taskDesc: {
    color: "#1B2559",
    fontSize: "14px",
    fontWeight: "bold",
  },
};


export default CalendarPage;
