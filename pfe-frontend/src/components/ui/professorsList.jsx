import React, { useState } from "react";

const ProfessorList = ({ searchQuery }) => {
  const [professors] = useState([
    {
      id: 1,
      firstName: "Amina",
      lastName: "Bouzid",
      email: "bouzid@univ-tlemcen.dz",
      grade: "Professeur",
      recruitmentDate: "2010-09-15",
    },
    {
      id: 2,
      firstName: "Yassine",
      lastName: "Belkhir",
      email: "belkhir@univ-tlemcen.dz",
      grade: "Maitre de Conférences A",
      recruitmentDate: "2015-02-20",
    },
    {
      id: 3,
      firstName: "Souad",
      lastName: "Khaled",
      email: "khaled@univ-tlemcen.dz",
      grade: "Maitre de Conférences B",
      recruitmentDate: "2018-11-30",
    },
    {
      id: 4,
      firstName: "Samir",
      lastName: "Benali",
      email: "benali@univ-tlemcen.dz",
      grade: "Maitre Assistant A",
      recruitmentDate: "2020-01-10",
    },
    {
      id: 5,
      firstName: "Fatima",
      lastName: "Bensalem",
      email: "bensalem@univ-tlemcen.dz",
      grade: "Maitre Assistant B",
      recruitmentDate: "2022-05-18",
    },
  ]);

  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (professor) => {
    setSelectedProfessor(professor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfessor(null);
  };

  // Filter professors based on search query
  const filteredProfessors = professors.filter(
    (professor) =>
      (professor.firstName + " " + professor.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professor.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="professor-list bg-white rounded-xl">
      {/* Column Headers */}
      <div className="flex justify-start items-center pl-2 pb-1 border-b border-gray-300 font-medium text-gray-3 text-xs font-Roboto">
        <div className="w-[32%] flex justify-start items-start">Professor</div>
        <div className="w-[20%] flex justify-start items-start">Grade</div>
        <div className="w-[20%] flex justify-center items-center">
          Recruitment Date
        </div>
      </div>

      {/* Scrollable List of Professors */}
      <div className="max-h-96 overflow-y-auto">
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
                    {professor.firstName} {professor.lastName}
                  </p>
                  <p className="text-11 text-gray-4">{professor.email}</p>
                </div>
              </div>
              <div className="w-[22%] flex justify-start items-start font-Roboto text-12">
                {professor.grade}
              </div>
              <div className="w-[20%] flex justify-center items-start font-Roboto text-13">
                {professor.recruitmentDate}
              </div>
              <div className="flex flex-row justify-end items-center gap-1 w-[25%]">
                <button
                  className="text-gray-3 hover:bg-gray-100 rounded-md py-1 px-2 text-xs font-Roboto"
                  onClick={() => handleEditClick(professor)}
                >
                  Edit
                </button>
                <button className="text-red-3 bg-red-2 hover:bg-blue-3 rounded-md py-1 px-2 text-xs font-Roboto">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup Modal */}
      {isModalOpen && selectedProfessor && (
        <div className="fixed right-0 -top-16 h-screen w-full flex items-center justify-center bg-gray-4 bg-opacity-50 backdrop-blur-sm">
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
                    value={selectedProfessor.firstName}
                    onChange={(e) =>
                      setSelectedProfessor({
                        ...selectedProfessor,
                        firstName: e.target.value,
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
                    value={selectedProfessor.lastName}
                    onChange={(e) =>
                      setSelectedProfessor({
                        ...selectedProfessor,
                        lastName: e.target.value,
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
                value={selectedProfessor.email}
                onChange={(e) =>
                  setSelectedProfessor({
                    ...selectedProfessor,
                    email: e.target.value,
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
                value={selectedProfessor.recruitmentDate}
                onChange={(e) =>
                  setSelectedProfessor({
                    ...selectedProfessor,
                    recruitmentDate: e.target.value,
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
                onClick={() => {
                  // Add save logic here
                  closeModal();
                }}
                className="mt-4 bg-blue-6 text-13 text-white py-1 px-4 rounded hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorList;
