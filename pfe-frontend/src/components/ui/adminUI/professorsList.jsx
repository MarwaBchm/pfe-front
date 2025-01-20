import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { LinearProgress } from "@mui/material";

const ProfessorList = ({ searchQuery }) => {
  const [professors, setProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // Add this for delete action
  const [alertMessage, setAlertMessage] = useState(null);

  // Fetch professors from the backend
  useEffect(() => {
    const fetchProfessors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professors"
        );
        setProfessors(response.data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  const handleEditClick = (professor) => {
    setSelectedProfessor({ ...professor, user: { ...professor.user } });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedProfessor) return;

    setIsActionLoading(true);
    try {
      // Update professor in the backend
      await axios.put(
        `http://127.0.0.1:8000/api/professors/${selectedProfessor.id}`,
        selectedProfessor
      );
      // Refresh the list of professors
      const response = await axios.get("http://127.0.0.1:8000/api/professors");
      setProfessors(response.data);
      setAlertMessage("Professor updated successfully!");
      closeModal();

      // Hide alert after 7 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 7000);
    } catch (error) {
      console.error("Error updating professor:", error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleteLoading(true); // Set delete loading state
    try {
      // Delete professor from the backend
      await axios.delete(`http://127.0.0.1:8000/api/professors/${id}`);
      // Refresh the list of professors
      const response = await axios.get("http://127.0.0.1:8000/api/professors");
      setProfessors(response.data);
      setAlertMessage("Professor deleted successfully!");

      // Hide alert after 7 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 7000);
    } catch (error) {
      console.error("Error deleting professor:", error);
    } finally {
      setIsDeleteLoading(false); // Reset delete loading state
    }
  };

  // Filter professors based on search query
  const filteredProfessors = professors.filter(
    (professor) =>
      (professor.firstname + " " + professor.lastname)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      professor.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="professor-list bg-white rounded-xl ">
      {/* Loading Circular Progress */}

      {/* Full-Screen Progress for Actions */}

      {/* Alert Message */}
      {alertMessage && (
        <div className="w-full p-2 bg-green-100 text-green-800 text-center text-sm mb-2 rounded">
          {alertMessage}
        </div>
      )}
      {isDeleteLoading && (
        <div className="w-full flex items-center justify-center my-2 mb-4">
          <LinearProgress
            color="error"
            sx={{ width: "100%", height: 5, borderRadius: "10px" }}
          />
        </div>
      )}
      {/* Column Headers */}
      <div className="flex justify-start items-center pl-2 pb-1 border-b border-gray-300 font-medium text-gray-3 text-xs font-Roboto">
        <div className="w-[32%] flex justify-start items-start">Professor</div>
        <div className="w-[20%] flex justify-start items-start">Grade</div>
        <div className="w-[20%] flex justify-center items-center">
          Recruitment Date
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-16">
          <CircularProgress />
        </div>
      )}
      {/* Scrollable List of Professors */}
      <div className="max-h-80 overflow-y-auto">
        <ul className="list-none p-0">
          {filteredProfessors.map((professor) => (
            <li
              key={professor.id}
              className="flex justify-start items-center p-2 border-b border-gray-200"
            >
              <div className="flex flex-row justify-start items-start gap-1.5 text-14 w-[32%]">
                <img src="/list.jpg" className="w-9 rounded-xl" alt="Profile" />
                <div className="flex flex-col justify-between items-start">
                  <p className="font-medium text-13 text-blue-2">
                    {professor.firstname} {professor.lastname}
                  </p>
                  <p className="text-11 text-gray-4">{professor.user.email}</p>
                </div>
              </div>
              <div className="w-[22%] flex justify-start items-start font-Roboto text-12">
                {professor.grade}
              </div>
              <div className="w-[20%] flex justify-center items-start font-Roboto text-13">
                {professor.recruitment_date}
              </div>
              <div className="flex flex-row justify-end items-center gap-1 w-[25%]">
                <button
                  className="text-gray-3 hover:bg-gray-100 rounded-md py-1 px-2 text-xs font-Roboto"
                  onClick={() => handleEditClick(professor)}
                >
                  Edit
                </button>
                <button
                  className="text-red-3 bg-red-2 hover:bg-red-200 rounded-md py-1 px-2 text-xs font-Roboto"
                  onClick={() => handleDelete(professor.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {isModalOpen && selectedProfessor && (
        <div className="fixed right-0 -top-16  h-screen w-full flex items-center justify-center bg-gray-4 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-dashed border-blue-5 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold mb-6">✏️ Edit Professor</h3>

            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex flex-col w-full justify-between items-start gap-2">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="firstName"
                    className="text-gray-2 text-13 pl-1 mb-0.5"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={selectedProfessor.firstname}
                    onChange={(e) =>
                      setSelectedProfessor({
                        ...selectedProfessor,
                        firstname: e.target.value,
                      })
                    }
                    className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="lastName"
                    className="text-gray-2 text-13 pl-1 mb-0.5"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={selectedProfessor.lastname}
                    onChange={(e) =>
                      setSelectedProfessor({
                        ...selectedProfessor,
                        lastname: e.target.value,
                      })
                    }
                    className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="relative w-1/3 ml-4">
                <label
                  htmlFor="imageInput"
                  className="block w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500"
                >
                  <img
                    src="/list.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-gray-2 text-13 pl-1 pt-2 mb-0.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={selectedProfessor.user.email}
                onChange={(e) =>
                  setSelectedProfessor({
                    ...selectedProfessor,
                    user: { ...selectedProfessor.user, email: e.target.value },
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="grade"
                className="text-gray-2 text-13 pl-1 pt-2 mb-0.5"
              >
                Grade
              </label>
              <input
                id="grade"
                type="text"
                value={selectedProfessor.grade}
                onChange={(e) =>
                  setSelectedProfessor({
                    ...selectedProfessor,
                    grade: e.target.value,
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="recruitmentDate"
                className="text-gray-2 text-13 pl-1 pt-2 mb-0.5"
              >
                Recruitment Date
              </label>
              <input
                id="recruitmentDate"
                type="date"
                value={selectedProfessor.recruitment_date}
                onChange={(e) =>
                  setSelectedProfessor({
                    ...selectedProfessor,
                    recruitment_date: e.target.value,
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-row justify-end mt-6 w-full gap-3">
              <button
                onClick={closeModal}
                className="mt-4 bg-red-1 text-13 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Discard
              </button>
              <button
                onClick={handleSaveChanges}
                className="mt-4 bg-blue-6 text-13 text-white py-1 px-4 rounded hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
            {isActionLoading && (
              <div className="w-full flex items-center justify-center my-2">
                <LinearProgress
                  color="primary"
                  sx={{ width: "100%", height: 6, borderRadius: "10px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorList;
