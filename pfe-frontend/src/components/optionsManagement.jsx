import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your backend URL

function OptionsManagement() {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({ name: "", abbreviation: "" });
  const [editingOption, setEditingOption] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch options from the backend
  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/options`);
      setOptions(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch options. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new option
  const handleAddOption = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/options`, newOption);
      setOptions([...options, response.data]);
      setNewOption({ name: "", abbreviation: "" });
      setError(null);
    } catch (err) {
      setError("Failed to add option. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit an option
  const handleEditOption = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/options/${editingOption.id}`,
        editingOption
      );
      setOptions(
        options.map((option) =>
          option.id === editingOption.id ? response.data : option
        )
      );
      setEditingOption(null);
      setError(null);
    } catch (err) {
      setError("Failed to update option. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an option
  const handleDeleteOption = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/options/${id}`);
      setOptions(options.filter((option) => option.id !== id));
      setShowDeleteConfirmation(null);
      setError(null);
    } catch (err) {
      setError("Failed to delete option. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <p className="text-gray-600 text-left mb-6 font-medium font-Roboto text-lg">
        ⚙️ Configure and manage academic program options
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="w-full flex flex-row justify-between gap-10">
        <div className="bg-white py-4 px-6 rounded-md shadow-md w-[70%]">
          <h2 className="text-xl font-semibold text-blue-1 mb-4 font-sans">
            Current Options
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : options.length === 0 ? (
            <p className="text-gray-500">
              No options configured yet. Add a new option to get started!
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border">
                  <th className="border p-2 text-left text-blue-1 font-medium">
                    Abbreviation
                  </th>
                  <th className="p-2 text-left text-blue-1 font-medium">
                    Full Name
                  </th>
                  <th className="p-2 text-left text-blue-1"></th>
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr
                    key={option.id}
                    className="odd:bg-white even:bg-gray-50 border align-baseline"
                  >
                    <td className="border p-2 font-Roboto text-15">
                      {option.abbreviation}
                    </td>
                    <td className="border p-2 border-r-0 font-Roboto">
                      {option.name}
                    </td>
                    <td className="p-2 flex gap-2 px-0 justify-center items-center pr-1">
                      <button
                        onClick={() => setEditingOption(option)}
                        className="bg-green-200 text-green-700 text-14 h-fit px-3 py-0.5 rounded-lg hover:bg-green-300 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirmation(option.id)}
                        className="bg-red-1 text-white text-14 px-3 py-0.5 rounded-lg hover:bg-red-700 transition"
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
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4">
                Are you sure you want to delete this option?
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDeleteOption(showDeleteConfirmation)}
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
            onSubmit={editingOption ? handleEditOption : handleAddOption}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col w-full gap-0">
              <h1 className="text-blue-4 font-sans font-medium mb-4 text-lg">
                {editingOption ? "✏️ Edit Option" : "+ Add a new option"}
              </h1>
              <label className="font-medium font-sans text-blue-1 text-14">
                Abbreviation
              </label>
              <input
                type="text"
                placeholder="Enter abbreviation"
                className="border rounded-lg p-2 focus:border-2 focus:border-blue-4 focus:outline-none"
                value={
                  editingOption
                    ? editingOption.abbreviation
                    : newOption.abbreviation
                }
                onChange={(e) =>
                  editingOption
                    ? setEditingOption({
                        ...editingOption,
                        abbreviation: e.target.value,
                      })
                    : setNewOption({
                        ...newOption,
                        abbreviation: e.target.value,
                      })
                }
                required
              />
            </div>

            <div className="flex flex-col w-full mb-6">
              <label className="font-medium font-sans text-blue-1 text-14">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full program name"
                className="border rounded-lg px-2 py-1.5 focus:border-2 focus:border-blue-4 focus:outline-none"
                value={editingOption ? editingOption.name : newOption.name}
                onChange={(e) =>
                  editingOption
                    ? setEditingOption({
                        ...editingOption,
                        name: e.target.value,
                      })
                    : setNewOption({ ...newOption, name: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-2 items-end justify-end w-full">
              <button
                type="submit"
                className="bg-blue-4 text-white px-3 py-1 text-14 rounded-lg hover:bg-blue-800 transition"
              >
                {editingOption ? "Update Option" : "Add Option"}
              </button>
              {editingOption && (
                <button
                  type="button"
                  onClick={() => setEditingOption(null)}
                  className="bg-red-600 text-white px-3 text-14 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OptionsManagement;
