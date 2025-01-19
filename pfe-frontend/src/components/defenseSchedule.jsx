import React, { useState } from 'react';

const DefenseManagement = () => {
  const [defenses, setDefenses] = useState([]);
  const [newDefense, setNewDefense] = useState({
    date: '',
    time: '',
    room: '',
    project: '',
    supervisor: '', // Encadreur
  });
  const [editingDefenseId, setEditingDefenseId] = useState(null); // Track which defense is being edited
  const [currentRole, setCurrentRole] = useState('Admin'); // Default role is Admin
  const [showJuryModal, setShowJuryModal] = useState(false); // Control jury modal visibility
  const [selectedDefenseId, setSelectedDefenseId] = useState(null); // Track which defense is being assigned a jury
  const [selectedJury, setSelectedJury] = useState([]); // Track selected jury members

  // List of available jury members
  const juryMembers = [
    { id: 1, name: 'Jury 1', grade: 'Professor' },
    { id: 2, name: 'Jury 2', grade: 'Associate Professor' },
    { id: 3, name: 'Jury 3', grade: 'Assistant Professor' },
    { id: 4, name: 'Jury 4', grade: 'Professor' },
    { id: 5, name: 'Jury 5', grade: 'Associate Professor' },
  ];

  // Add or update a defense (Admin only)
  const handleSaveDefense = () => {
    if (newDefense.date && newDefense.time && newDefense.room && newDefense.project && newDefense.supervisor) {
      if (editingDefenseId) {
        // Update existing defense
        setDefenses(
          defenses.map((defense) =>
            defense.id === editingDefenseId
              ? { ...newDefense, id: editingDefenseId, jury: defense.jury }
              : defense
          )
        );
        setEditingDefenseId(null); // Reset editing state
      } else {
        // Add new defense
        setDefenses([...defenses, { ...newDefense, id: Date.now(), jury: [] }]);
      }
      setNewDefense({ date: '', time: '', room: '', project: '', supervisor: '' }); // Reset form
    }
  };

  // Edit a defense (Admin only)
  const handleEditDefense = (defenseId) => {
    const defense = defenses.find((d) => d.id === defenseId);
    if (defense) {
      setNewDefense(defense); // Populate form with defense data
      setEditingDefenseId(defenseId); // Set editing state
    }
  };

  // Delete a defense (Admin only)
  const handleDeleteDefense = (defenseId) => {
    setDefenses(defenses.filter((defense) => defense.id !== defenseId));
  };

  // Open jury selection modal
  const openJuryModal = (defenseId) => {
    setSelectedDefenseId(defenseId);
    setShowJuryModal(true);
  };

  // Close jury selection modal
  const closeJuryModal = () => {
    setShowJuryModal(false);
    setSelectedJury([]); // Reset selected jury
  };

  // Handle jury selection
  const handleJurySelection = (juryId) => {
    if (selectedJury.includes(juryId)) {
      // Remove jury member if already selected
      setSelectedJury(selectedJury.filter((id) => id !== juryId));
    } else {
      // Add jury member if not selected
      setSelectedJury([...selectedJury, juryId]);
    }
  };

  // Assign selected jury to defense
  const assignJuryToDefense = () => {
    if (selectedDefenseId && selectedJury.length > 0) {
      const selectedJuryMembers = juryMembers.filter((jury) =>
        selectedJury.includes(jury.id)
      );
      setDefenses(
        defenses.map((defense) =>
          defense.id === selectedDefenseId
            ? { ...defense, jury: selectedJuryMembers }
            : defense
        )
      );
      closeJuryModal(); // Close the modal after assigning jury
    }
  };

  return (
  
  <div class="flex justify-center items-center min-h-screen">
  <div class="p-6 bg-gray-100 rounded-[30px] shadow-lg w-96 border border-gray-300">
      <h1 className="text-2xl font-bold mb-6">Defense Management</h1>

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

      {/* Admin View: Add/Edit Defenses */}
      {currentRole === 'Admin' && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingDefenseId ? 'Edit Defense' : 'Schedule a New Defense'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newDefense.date}
              onChange={(e) => setNewDefense({ ...newDefense, date: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="time"
              value={newDefense.time}
              onChange={(e) => setNewDefense({ ...newDefense, time: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Room"
              value={newDefense.room}
              onChange={(e) => setNewDefense({ ...newDefense, room: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Project Title"
              value={newDefense.project}
              onChange={(e) => setNewDefense({ ...newDefense, project: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={newDefense.supervisor}
              onChange={(e) => setNewDefense({ ...newDefense, supervisor: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="">Select Supervisor</option>
              {juryMembers.map((jury) => (
                <option key={jury.id} value={jury.name}>
                  {jury.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSaveDefense}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingDefenseId ? 'Update Defense' : 'Schedule Defense'}
          </button>
          {editingDefenseId && (
            <button
              onClick={() => {
                setNewDefense({ date: '', time: '', room: '', project: '', supervisor: '' });
                setEditingDefenseId(null);
              }}
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* List of Scheduled Defenses */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Scheduled Defenses</h2>
        <div className="space-y-4">
          {defenses.map((defense) => (
            <div key={defense.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{defense.project}</p>
                  <p className="text-sm text-gray-600">
                    {defense.date} | {defense.time} | Room: {defense.room}
                  </p>
                  <p className="text-sm text-gray-600">Supervisor: {defense.supervisor}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditDefense(defense.id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDefense(defense.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openJuryModal(defense.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Assign Jury
                  </button>
                </div>
              </div>
              {defense.jury.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Assigned Jury:</h3>
                  <ul className="list-disc pl-6">
                    {defense.jury.map((jury, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {jury.name} ({jury.grade})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Jury Selection Modal */}
      {showJuryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Select Jury Members</h2>
            <div className="space-y-2">
              {juryMembers.map((jury) => (
                <div key={jury.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJury.includes(jury.id)}
                    onChange={() => handleJurySelection(jury.id)}
                    className="mr-2"
                  />
                  <span>
                    {jury.name} ({jury.grade})
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeJuryModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={assignJuryToDefense}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
              >
                Assign Jury
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DefenseManagement;