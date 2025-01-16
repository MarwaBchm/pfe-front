import React, { useState } from "react";

const INITIAL_MAJORS = [
  { id: 1, abbreviation: "AI", fullName: "Artificial Intelligence" },
  { id: 2, abbreviation: "GL", fullName: "Génie Logiciel" },
  {
    id: 3,
    abbreviation: "SIC",
    fullName: " Systèmes d'Information et de Communication",
  },
  { id: 4, abbreviation: "RSD", fullName: "Réseaux et Systèmes Distribués" },
];

function OptionsManagement() {
  const [majors, setMajors] = useState(INITIAL_MAJORS);
  const [newMajor, setNewMajor] = useState({ abbreviation: "", fullName: "" });
  const [editingMajor, setEditingMajor] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);

  function handleAddMajor(e) {
    e.preventDefault();
    const newId =
      majors.length > 0 ? Math.max(...majors.map((m) => m.id)) + 1 : 1;
    setMajors([...majors, { ...newMajor, id: newId }]);
    setNewMajor({ abbreviation: "", fullName: "" });
  }

  function handleEditMajor(e) {
    e.preventDefault();
    setMajors(
      majors.map((major) =>
        major.id === editingMajor.id ? editingMajor : major
      )
    );
    setEditingMajor(null);
  }

  function confirmDeleteMajor(id) {
    setShowDeleteConfirmation(id);
  }

  function handleDeleteMajor(id) {
    setMajors(majors.filter((major) => major.id !== id));
    setShowDeleteConfirmation(null);
  }

  return (
    <div className=" p-6  min-h-screen">
      <p className="text-gray-600 text-left mb-6  font-medium font-Roboto text-lg">
        ⚙️ Configure and manage academic program options
      </p>

      <div className=" w-full flex flex-row justify-between gap-10">
        <div className="bg-white py-4 px-6 rounded-md shadow-md w-[70%]">
          <h2 className="text-xl font-semibold text-blue-1 mb-4 font-sans">
            Current Majors
          </h2>
          {majors.length === 0 ? (
            <p className="text-gray-500">
              No majors configured yet. Add a new major to get started!
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className=" border">
                  <th className=" border p-2 text-left text-blue-1 font-medium">
                    Abbreviation
                  </th>
                  <th className=" p-2 text-left text-blue-1 font-medium">
                    Full Name
                  </th>
                  <th className=" p-2 text-left text-blue-1"></th>
                </tr>
              </thead>
              <tbody>
                {majors.map((major) => (
                  <tr
                    key={major.id}
                    className="odd:bg-white even:bg-gray-50 border align-baseline"
                  >
                    <td className="border p-2 font-Roboto text-15">
                      {major.abbreviation}
                    </td>
                    <td className="border p-2 border-r-0 font-Roboto ">
                      {major.fullName}
                    </td>
                    <td className=" p-2 flex gap-2    px-0 justify-center items-center  pr-1">
                      <button
                        onClick={() => setEditingMajor(major)}
                        className="bg-green-200 text-green-700 text-14 h-fit px-3 py-0.5 rounded-lg hover:bg-green-300 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDeleteMajor(major.id)}
                        className="bg-red-1 text-white text-14  px-3 py-0.5  rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
              <p className="mb-4">
                Are you sure you want to delete this major?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDeleteMajor(showDeleteConfirmation)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white p-3 rounded-lg shadow-md mb-6 w-[30%]">
          <form
            onSubmit={editingMajor ? handleEditMajor : handleAddMajor}
            className="flex flex-col  gap-4"
          >
            <div className="flex flex-col w-full gap-0 ">
              <h1 className=" text-blue-4 font-sans font-medium mb-4 text-lg">
                {editingMajor ? "✏️ Edit Major" : "+\tAdd a new option"}
              </h1>
              <label
                className="font-medium font-sans text-blue-1
              text-14"
              >
                Abbreviation
              </label>
              <input
                type="text"
                placeholder="Enter abbreviation"
                className="border  rounded-lg p-2 focus:border-2 focus:border-blue-4 focus:outline-none"
                value={
                  editingMajor
                    ? editingMajor.abbreviation
                    : newMajor.abbreviation
                }
                onChange={(e) =>
                  editingMajor
                    ? setEditingMajor({
                        ...editingMajor,
                        abbreviation: e.target.value,
                      })
                    : setNewMajor({ ...newMajor, abbreviation: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col w-full mb-6">
              <label
                className="font-medium font-sans text-blue-1
                text-14"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full program name"
                className="border rounded-lg px-2 py-1.5 focus:border-2 focus:border-blue-4 focus:outline-none"
                value={editingMajor ? editingMajor.fullName : newMajor.fullName}
                onChange={(e) =>
                  editingMajor
                    ? setEditingMajor({
                        ...editingMajor,
                        fullName: e.target.value,
                      })
                    : setNewMajor({ ...newMajor, fullName: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-2 items-end justify-end w-full">
              <button
                type="submit"
                className="bg-blue-4 text-white px-3 py-1 text-14 rounded-lg hover:bg-blue-800 transition"
              >
                {editingMajor ? " Update Major" : " Add Major"}
              </button>
              {editingMajor && (
                <button
                  type="button"
                  onClick={() => setEditingMajor(null)}
                  className="bg-red-600 text-white px-3  text-14 py-1 rounded-lg hover:bg-red-700 transition"
                >
                Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <img src="/options.png" className="w-36 fixed bottom-0 right-4 opacity-50"/>
    </div>
  );
}

export default OptionsManagement;
