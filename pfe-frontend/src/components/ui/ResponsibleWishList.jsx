import React, { useState, useMemo } from "react";

const mockStudents = [
  {
    id: 1,
    name: "Alice Smith",
    major: "AI",
    topChoice: "Chatbot AI",
  },
  {
    id: 2,
    name: "Bob Johnson",
    major: "GL",
    topChoice: "Cloud Inventory",
  },
  {
    id: 3,
    name: "Charlie Brown",
    major: "RSD",
    topChoice: "Data Streaming",
  },
];

const mockProfessors = [
  {
    id: 1,
    name: "Dr. Emily Rodriguez",
    grade: "Senior Professor",
  },
  {
    id: 2,
    name: "Prof. Michael Chang",
    grade: "Associate Professor",
  },
];

function ResponsibleWishList() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [professorSearch, setProfessorSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState("All");

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.major.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.topChoice.toLowerCase().includes(studentSearch.toLowerCase());
      const matchesMajor =
        majorFilter === "All" || student.major === majorFilter;
      return matchesSearch && matchesMajor;
    });
  }, [studentSearch, majorFilter]);

  const filteredProfessors = useMemo(() => {
    return mockProfessors.filter((professor) => {
      const matchesSearch =
        professor.name.toLowerCase().includes(professorSearch.toLowerCase()) ||
        professor.grade.toLowerCase().includes(professorSearch.toLowerCase());
      const matchesGrade =
        gradeFilter === "All" || professor.grade === gradeFilter;
      return matchesSearch && matchesGrade;
    });
  }, [professorSearch, gradeFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-semibold mb-6 text-blue-4 font-Roboto">
        Explore and manage the wish lists of both students and professors in one
        place✨
      </h1>
      <div className=" flex flex-row w-full  justify-start mb-2">
        <div className=" flex w-1/2 justify-center items-cente">
          <button className=" text-center text-14 rounded-md bg-red-4 text-red-2 py-1 px-3">
            {" "}
            Start the projects auto-affectation
          </button>
        </div>
        <div className=" flex w-1/2 justify-center items-center">
          <button className="text-center text-14 rounded-md bg-red-4 text-red-2 py-1 px-3">
            {" "}
            Start the defenses auto-affectation
          </button>
        </div>
      </div>{" "}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍   Search Students by Name, Major, or Top Choice..."
          value={studentSearch}
          onChange={(e) => setStudentSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-4 text-blue-2 font-Roboto"
        />

        <input
          type="text"
          placeholder=" 🔍   Search Professors by Name or Grade..."
          value={professorSearch}
          onChange={(e) => setProfessorSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-4 text-blue-2 font-Roboto"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-md py-2 px-4">
          <div className="flex flex-row w-full justify-between items-center mb-2">
            <h2 className="text-lg font-semibold font-sans text-blue-2">
              {" "}
              👩🏻‍🎓 Students
            </h2>
            <select
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-fit  focus:outline-none focus:ring-1 focus:ring-blue-800"
            >
              <option value="All">All Majors</option>
              <option value="AI">AI</option>
              <option value="GL">GL</option>
              <option value="SIC">SIC</option>
              <option value="RSD">RSD</option>
            </select>
          </div>
          <div className=" flex justify-between items-center p-2 pb-0 border-b  text-gray-2 text-12 font-medium">
            <h2 className=" w-1/2">Full Name </h2>
            <h2 className=" w-1/4">Major </h2>
            <h2 className=" w-1/4">Top Choice</h2>
          </div>
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex justify-between items-center p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedStudent(student)}
            >
              <span className=" w-1/2 text-blue-1 text-16">{student.name}</span>
              <span className="text-sm text-gray-500 w-1/4 ">
                {student.major}
              </span>
              <span className="text-sm text-slate-700 w-1/4">
                {student.topChoice}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded py-2 px-4">
          <div className=" flex flex-row  justify-between items-center w-full mb-2 ">
            <h2 className="text-lg font-semibold font-sans text-blue-2 ">
              {" "}
              👨‍🏫 Professors
            </h2>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 w-fit focus:outline-none focus:ring-1 focus:ring-blue-800 "
            >
              <option value="All">All Grades</option>
              <option value="Senior Professor">Senior Professor</option>
              <option value="Associate Professor">Associate Professor</option>
            </select>
          </div>
          <div className=" flex justify-between items-center p-2 pb-0 border-b  text-gray-2 text-12 font-medium">
            <h2 className=" w-3/5">Full Name </h2>
            <h2 className=" w-2/5">Grade </h2>
          </div>
          {filteredProfessors.map((professor) => (
            <div
              key={professor.id}
              className="flex justify-between items-center p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedProfessor(professor)}
            >
              <span className=" w-3/5 text-blue-1 text-16">
                {professor.name}
              </span>
              <span className="text-sm text-slate-700 w-2/5">
                {professor.grade}
              </span>
            </div>
          ))}
        </div>
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">Student Details</h3>
            <p>
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p>
              <strong>Major:</strong> {selectedStudent.major}
            </p>
            <p>
              <strong>Top Choice:</strong> {selectedStudent.topChoice}
            </p>
            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectedProfessor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">Professor Details</h3>
            <p>
              <strong>Name:</strong> {selectedProfessor.name}
            </p>
            <p>
              <strong>Grade:</strong> {selectedProfessor.grade}
            </p>
            <button
              onClick={() => setSelectedProfessor(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsibleWishList;
