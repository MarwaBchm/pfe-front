import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const StudentList = ({ searchQuery }) => {
  const [students] = useState([
    {
      id: 1,
      firstName: "Ahmed",
      lastName: "Mustafa",
      email: "ahmed@univ-tlemcen.dz",
      major: "Artificial Intelligence",
      ranking: "1st",
      chosenSubject: "Autonomous Vehicle Control Systems",
      masterAverage: 19.5,
      projectType: "Classic",
    },
    {
      id: 2,
      firstName: "Amina",
      lastName: "Khaled",
      email: "amina@univ-tlemcen.dz",
      major: "Artificial Intelligence",
      ranking: "15th",
      chosenSubject: "Deep Learning for Medical Imaging",
      masterAverage: 19.0,
      projectType: "Innovant",
    },
    {
      id: 3,
      firstName: "Mohammed",
      lastName: "Ali",
      email: "mohammed@univ-tlemcen.dz",
      major: "Software Engineering",
      ranking: "21st",
      chosenSubject: "Web Application Development",
      masterAverage: 16.0,
      projectType: "Classic",
    },
    {
      id: 4,
      firstName: "Layla",
      lastName: "Nasser",
      email: "layla@univ-tlemcen.dz",
      major: "Information Systems",
      ranking: "22nd",
      chosenSubject: "Cloud-based ERP Solutions",
      masterAverage: 17.3,
      projectType: "Innovant",
    },
    {
      id: 5,
      firstName: "Omar",
      lastName: "Saeed",
      email: "omar@univ-tlemcen.dz",
      major: "Artificial Intelligence",
      ranking: "1st",
      chosenSubject: "Natural Language Processing for Arabic Texts",
      masterAverage: 14.8,
      projectType: "Innovant",
    },
    {
      id: 6,
      firstName: "Salma",
      lastName: "Ahmed",
      email: "salma@univ-tlemcen.dz",
      major: "Software Engineering",
      ranking: "10th",
      chosenSubject: "Mobile App Development",
      masterAverage: 18.0,
      projectType: "Classic",
    },
    {
      id: 7,
      firstName: "Youssef",
      lastName: "Hassan",
      email: "youssef@univ-tlemcen.dz",
      major: "Network Systems",
      ranking: "19th",
      chosenSubject: "SDN and Network Security",
      masterAverage: 18.7,
      projectType: "Classic",
    },
    {
      id: 8,
      firstName: "Nour",
      lastName: "El-Din",
      email: "nour@univ-tlemcen.dz",
      major: "Network Systems",
      ranking: "3rd",
      chosenSubject: "5G Network Optimization",
      masterAverage: 15.5,
      projectType: "NULL",
    },
    {
      id: 9,
      firstName: "Fatima",
      lastName: "Zahra",
      email: "fatima@univ-tlemcen.dz",
      major: "Information Systems",
      ranking: "7th",
      chosenSubject: "Data Analytics for Business Intelligence",
      masterAverage: 13.9,
      projectType: "NULL",
    },
    {
      id: 10,
      firstName: "Karim",
      lastName: "Fathi",
      email: "karim@univ-tlemcen.dz",
      major: "Network Systems",
      ranking: "4th",
      chosenSubject: "IoT Security and Privacy",
      masterAverage: 17.9,
      projectType: "NULL",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const getOrdinal = (rank) => {
    const rankNumber = parseInt(rank, 10);
    const suffixes = ["th", "st", "nd", "rd"];
    const v = rankNumber % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    return `${rankNumber}${suffix}`;
  };

  const getRankingColor = (rank) => {
    const rankNumber = parseInt(rank, 10);
    if (rankNumber <= 10) return "text-green-1 text-medium";
    if (rankNumber <= 20) return "text-orange-1 text-medium";
    return "text-red-1";
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="student-list bg-white rounded-xl  px-2">
      <div className="flex justify-between items-center pl-2 pb-1 border-b border-gray-300 font-medium text-gray-3 text-xs font-Roboto ">
        <div className="w-[28%] flex justify-start items-start">Student</div>
        <div className="w-[22%] flex justify-start items-start lg:block md:hidden sm:hidden ">
          Major
        </div>
        <div className="w-[19%] flex flex-row justify-center  items-cente">
          <p> Average Mark | Ranking</p>
        </div>
        <div className="w-[12%] flex justify-start items-start lg:block md:hidden sm:hidden">
          Subject type
        </div>
        <div className="text-white">just random randomra</div>
      </div>

      {/* Scrollable List of Students */}
      <div className="max-h-80 overflow-y-auto">
        <ul className="list-none p-0">
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center p-2  pl-2 border-b border-gray-200"
            >
              <div className="flex flex-row justify-start items-center gap-1.5 text-14 lg:w-[28%] md:1/2 ">
                <img src="/list.jpg" className="w-9 h-9 rounded-xl" />
                <div className="flex flex-col justify-start items-start">
                  <p className="font-medium text-13 text-blue-2">
                    {student.lastName}
                    {student.firstName}
                  </p>
                  <p className=" text-11 text-gray-4">{student.email}</p>
                </div>
              </div>
              <div className="w-[22%] flex justify-start items-start font-Roboto text-12 pl-1">
                {student.major}
              </div>
              <div className="w-[19%]   flex flex-row  gap-1 justify-center  items-center font-Roboto text-13">
                <p className="text-blue-2 font-Arial font-medium">
                  {student.masterAverage}
                </p>
                <p className="text-gray-3 opacity-35 font-bold">|</p>
                <p className={getRankingColor(student.ranking)}>
                  {getOrdinal(student.ranking)}
                </p>
              </div>
              <div className="flex  w-[12%] lg:block md:hidden sm:hidden text-12 font-Roboto">
                {student.projectType}
              </div>
              <div className="flex flex-row justify-between items-center gap-1">
                <button
                  className="text-gray-3 hover:bg-gray-100 rounded-md py-1 px-2 text-xs font-Roboto"
                  onClick={() => handleEditClick(student)}
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
      {isModalOpen && (
        <div className="fixed right-0 -top-16 h-screen w-full flex items-center justify-center bg-gray-4 bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg   border border-dashed border-blue-5 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold mb-6">✏️ Edit Student </h3>

            <div className="flex flex-row w-full justify-between items-center">
              <div className=" flex flex-col w-full justify-between items-start gap-2 ">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="firstName"
                    className="text-gray-2 text-13  pl-1 mb-0.5"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={selectedStudent.firstName}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        firstName: e.target.value,
                      })
                    }
                    className=" w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col w-full ">
                  <label
                    htmlFor="lastName"
                    className="text-gray-2 text-13  pl-1 mb-0.5"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={selectedStudent.lastName}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
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
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span>Select Image</span>
                    </div>
                  )}
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col w-full ">
              <label
                htmlFor="email"
                className="text-gray-2 text-13  pl-1 pt-2 mb-0.5"
              >
                Email address
              </label>
              <input
                id="email"
                type="text"
                value={selectedStudent.email}
                onChange={(e) =>
                  setSelectedStudent({
                    ...selectedStudent,
                    email: e.target.value,
                  })
                }
                className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className=" flex flex-row justify-center items-start pt-2 gap-2">
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="major"
                  className="text-gray-2 text-13  pl-1 mb-0.5"
                >
                  Major
                </label>
                <input
                  id="major"
                  type="text"
                  value={selectedStudent.major}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      major: e.target.value,
                    })
                  }
                  className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="masterAverage"
                  className="text-gray-2 text-13  pl-1 mb-0.5"
                >
                  Average Master
                </label>
                <input
                  id="masterAverage"
                  type="text"
                  value={selectedStudent.masterAverage}
                  onChange={(e) =>
                    setSelectedStudent({
                      ...selectedStudent,
                      masterAverage: e.target.value,
                    })
                  }
                  className="w-full text-blue-2 text-13 py-1 px-3 bg-gray-50 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className=" flex flex-row justify-end mt-6 w-full gap-3">
              <button
                onClick={closeModal}
                className="mt-4 bg-red-1 text-13 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Discard
              </button>{" "}
              <button
                onClick={closeModal}
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

export default StudentList;
