import React, { useState } from 'react';

const DeadlinePage = () => {
  const [deadlines, setDeadlines] = useState([
    { id: 1, phase: 'Proposal Submission', deadline: '2023-11-15', recipient: 'All' },
    { id: 2, phase: 'Project Selection', deadline: '2023-12-05', recipient: 'Teachers' },
    { id: 3, phase: 'Defense Scheduling', deadline: '2024-05-01', recipient: 'Students' },
    { id: 4, phase: 'Final Report Submission', deadline: '2024-06-15', recipient: 'Companies' },
  ]);
  const [newDeadline, setNewDeadline] = useState({ phase: '', deadline: '', recipient: 'All' });
  const [editingDeadlineId, setEditingDeadlineId] = useState(null); // Track which deadline is being edited
  const [currentRole, setCurrentRole] = useState('Admin'); // Default role is Admin

  // Add or update a deadline (Admin only)
  const handleSaveDeadline = () => {
    if (newDeadline.phase && newDeadline.deadline && newDeadline.recipient) {
      if (editingDeadlineId) {
        // Update existing deadline
        setDeadlines(
          deadlines.map((deadline) =>
            deadline.id === editingDeadlineId
              ? { ...newDeadline, id: editingDeadlineId }
              : deadline
          )
        );
        setEditingDeadlineId(null); // Reset editing state
      } else {
        // Add new deadline
        setDeadlines([...deadlines, { ...newDeadline, id: Date.now() }]);
      }
      setNewDeadline({ phase: '', deadline: '', recipient: 'All' }); // Reset form
    }
  };

  // Edit a deadline (Admin only)
  const handleEditDeadline = (deadlineId) => {
    const deadline = deadlines.find((d) => d.id === deadlineId);
    if (deadline) {
      setNewDeadline(deadline); // Populate form with deadline data
      setEditingDeadlineId(deadlineId); // Set editing state
    }
  };

  // Delete a deadline (Admin only)
  const handleDeleteDeadline = (deadlineId) => {
    setDeadlines(deadlines.filter((deadline) => deadline.id !== deadlineId));
  };

  // Filter deadlines based on the current role and recipient
  const getFilteredDeadlines = () => {
    if (currentRole === 'Admin') {
      return deadlines; // Admin sees all deadlines
    } else {
      return deadlines.filter((deadline) => {
        return (
          deadline.recipient === 'All' || // Show deadlines for "All"
          deadline.recipient.toLowerCase() === currentRole.toLowerCase() // Show deadlines for the current role
        );
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Deadline Management</h1>

      {/* Role Selector Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Switch Role:</label>
        <select
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Company">Company</option>
        </select>
      </div>

      {/* Admin View: Add/Edit Deadlines */}
      {currentRole === 'Admin' && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingDeadlineId ? 'Edit Deadline' : 'Add New Deadline'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Phase"
              value={newDeadline.phase}
              onChange={(e) => setNewDeadline({ ...newDeadline, phase: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={newDeadline.deadline}
              onChange={(e) => setNewDeadline({ ...newDeadline, deadline: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={newDeadline.recipient}
              onChange={(e) => setNewDeadline({ ...newDeadline, recipient: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
              <option value="Companies">Companies</option>
            </select>
          </div>
          <button
            onClick={handleSaveDeadline}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingDeadlineId ? 'Update Deadline' : 'Add Deadline'}
          </button>
          {editingDeadlineId && (
            <button
              onClick={() => {
                setNewDeadline({ phase: '', deadline: '', recipient: 'Companies' });
                setEditingDeadlineId(null);
              }}
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* List of Deadlines */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Deadlines</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Phase</th>
                <th className="px-4 py-2 text-left">Deadline</th>
                {currentRole === 'Admin' && (
                  <th className="px-4 py-2 text-left">Recipient</th>
                )}
                {currentRole === 'Admin' && (
                  <th className="px-4 py-2 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {getFilteredDeadlines().map((deadline) => (
                <tr key={deadline.id} className="border-b">
                  <td className="px-4 py-2">{deadline.phase}</td>
                  <td className="px-4 py-2">{deadline.deadline}</td>
                  {currentRole === 'Admin' && (
                    <td className="px-4 py-2">{deadline.recipient}</td>
                  )}
                  {currentRole === 'Admin' && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEditDeadline(deadline.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDeadline(deadline.id)}
                        className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeadlinePage;