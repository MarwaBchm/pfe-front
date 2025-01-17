import React, { useState, useEffect } from "react";
import "../styles/deadlines.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Deadlines = () => {
  const [role, setRole] = useState("prof"); // Current user role
  const [formData, setFormData] = useState({
    theme: "",
    description: "",
    dueDate: "",
  });
  const [selectedRole, setSelectedRole] = useState("prof"); // Role to send the deadline to
  const [deadlines, setDeadlines] = useState([]); // Shared deadlines state
  const [editingIndex, setEditingIndex] = useState(null); // For editing deadlines

  // Load deadlines from localStorage on component mount
  useEffect(() => {
    const storedDeadlines = localStorage.getItem("deadlines");
    if (storedDeadlines) {
      setDeadlines(JSON.parse(storedDeadlines));
    }
  }, []);

  // Save deadlines to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("deadlines", JSON.stringify(deadlines));
  }, [deadlines]);

  // Save or Update Deadline
  const handleSave = () => {
    const newDeadline = { ...formData, role: selectedRole }; // Add selected role to deadline
    if (editingIndex === null) {
      setDeadlines([...deadlines, newDeadline]); // Add a new deadline
    } else {
      const updatedDeadlines = [...deadlines];
      updatedDeadlines[editingIndex] = newDeadline; // Update existing deadline
      setDeadlines(updatedDeadlines);
    }
    setFormData({ theme: "", description: "", dueDate: "" }); // Reset form
    setSelectedRole("prof");
    setEditingIndex(null);
  };

  // Edit Deadline
  const handleEdit = (index) => {
    const deadlineToEdit = deadlines[index];
    setFormData(deadlineToEdit);
    setSelectedRole(deadlineToEdit.role);
    setEditingIndex(index);
  };

  // Delete Deadline
  const handleDelete = (index) => {
    const updatedDeadlines = deadlines.filter((_, i) => i !== index);
    setDeadlines(updatedDeadlines);
    setEditingIndex(null);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle role selection
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div>
      {role === "admin" ? (
        <div className="app-container">
          <div className="header-container">
            <h1 className="page-title">{editingIndex === null ? "Add Deadline" : "Edit Deadline"}</h1>
            <div className="form-header">
              <button className="form-button save-button" onClick={handleSave}>
                {editingIndex === null ? "Save" : "Update"}
              </button>
              <button
                className="form-button delete-button"
                onClick={() => {
                  if (editingIndex !== null) {
                    setFormData({ theme: "", description: "", dueDate: "" }); // Clear form
                    setEditingIndex(null); // Cancel editing
                  }
                }}
              >
                {editingIndex === null ? "Delete" : "Cancel Editing"}
              </button>
            </div>
          </div>
          <hr className="separator" />
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="theme">
                  <i className="fas fa-book icon"></i> Theme:
                </label>
                <select
                  id="theme"
                  className="form-input"
                  value={formData.theme}
                  onChange={handleChange}
                >
                  <option value="">- Select the theme -</option>
                  <option value="choosing-subject">Choosing subject</option>
                  <option value="submitting-innovation-project">
                    Submitting innovation project
                  </option>
                  <option value="managing-profile">Managing the profile</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  <i className="fas fa-align-left icon"></i> Description:
                </label>
                <textarea
                  id="description"
                  className="form-input"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write here..."
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">
                  <i className="fas fa-calendar-alt icon"></i> Due date:
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">
                  <i className="fas fa-user-tag icon"></i> Assign to Role:
                </label>
                <select
                  id="role"
                  className="form-input"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="prof">Professor</option>
                  <option value="student">Student</option>
                  <option value="entreprise">Entreprise</option>
                  <option value="proresponsable">Prof Responsable</option>
                </select>
              </div>
            </form>
          </div>
          <div className="deadlines-list">
            <h2>All Deadlines</h2>
            {deadlines.length > 0 ? (
              deadlines.map((deadline, index) => (
                <div key={index} className="deadline-item">
                  <h3>{deadline.theme}</h3>
                  <p>{deadline.description}</p>
                  <p><strong>Due Date:</strong> {deadline.dueDate}</p>
                  <p><strong>Role:</strong> {deadline.role}</p>
                  <button className="form-button edit-button" onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button className="form-button delete-button" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No deadlines available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="app-container">
          <h1 className="page-title">Deadlines for {role}</h1>
          {deadlines.length > 0 ? (
            deadlines.map((deadline, index) => (
              <div key={index} className="deadline-item">
                <h3>{deadline.theme}</h3>
                <p>{deadline.description}</p>
                <p><strong>Due Date:</strong> {deadline.dueDate}</p>
                <p><strong>Assigned By:</strong> Admin</p>
              </div>
            ))
          ) : (
            <p>No deadlines available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Deadlines;
