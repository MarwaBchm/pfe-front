import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for PFE project statistics
const mockProjectStats = {
  departments: {
    GenieLogiciel: {
      name: "Genie Logiciel",
      totalProjects: 15,
      completedProjects: 10,
      inProgressProjects: 4,
      pendingProjects: 1,
      students: { picked: 10, notPicked: 5 },
      professors: { suggested: 3, notSuggested: 1 },
      topics: { chosen: 12, notChosen: 3 },
      projectCompletionData: [
        { date: "Jan", completed: 3, inProgress: 4 },
        { date: "Feb", completed: 5, inProgress: 6 },
        { date: "Mar", completed: 8, inProgress: 7 },
      ],
    },
    ArtificialIntelligence: {
      name: "Artificial Intelligence",
      totalProjects: 10,
      completedProjects: 6,
      inProgressProjects: 3,
      pendingProjects: 1,
      students: { picked: 7, notPicked: 3 },
      professors: { suggested: 2, notSuggested: 1 },
      topics: { chosen: 8, notChosen: 2 },
      projectCompletionData: [
        { date: "Jan", completed: 2, inProgress: 3 },
        { date: "Feb", completed: 4, inProgress: 4 },
        { date: "Mar", completed: 6, inProgress: 5 },
      ],
    },
    Reseau: {
      name: "Reseau",
      totalProjects: 8,
      completedProjects: 5,
      inProgressProjects: 2,
      pendingProjects: 1,
      students: { picked: 6, notPicked: 2 },
      professors: { suggested: 2, notSuggested: 1 },
      topics: { chosen: 6, notChosen: 2 },
      projectCompletionData: [
        { date: "Jan", completed: 1, inProgress: 2 },
        { date: "Feb", completed: 3, inProgress: 3 },
        { date: "Mar", completed: 5, inProgress: 4 },
      ],
    },
    SystemDinformation: {
      name: "System D'information",
      totalProjects: 9,
      completedProjects: 7,
      inProgressProjects: 1,
      pendingProjects: 1,
      students: { picked: 9, notPicked: 0 },
      professors: { suggested: 1, notSuggested: 0 },
      topics: { chosen: 9, notChosen: 0 },
      projectCompletionData: [
        { date: "Jan", completed: 2, inProgress: 1 },
        { date: "Feb", completed: 5, inProgress: 1 },
        { date: "Mar", completed: 7, inProgress: 1 },
      ],
    },
  },
};

// Components
const StatCard = ({ title, value, icon, bgColor }) => (
  <div
    className={`p-6 rounded-lg shadow-lg flex items-center justify-between ${bgColor}`}
  >
    <div>
      <h3 className="text-sm font-medium text-white">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
    <div className="text-5xl text-white">{icon}</div>
  </div>
);

const ProjectCompletionChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Validated Projects",
        data: data.map((item) => item.completed),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
      {
        label: "Proposed Projects",
        data: data.map((item) => item.inProgress),
        borderColor: "#ffa500",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Project Progress</h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: { mode: "index", intersect: false },
          },
        }}
      />
    </div>
  );
};

// Role-Based Dashboards
const AdminDashboard = ({ stats, departments, setDepartment }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
    <div className="flex space-x-4 mb-6">
      {departments.map((dept) => (
        <button
          key={dept}
          onClick={() => setDepartment(dept)}
          className={`px-6 py-2 rounded ${
            stats.name === dept
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {dept}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon="📊"
        bgColor="bg-blue-500"
      />
      <StatCard
        title="Validated Projects"
        value={stats.completedProjects}
        icon="✅"
        bgColor="bg-green-500"
      />
      <StatCard
        title="Proposed Projects"
        value={stats.inProgressProjects}
        icon="🔄"
        bgColor="bg-yellow-500"
      />
      <StatCard
        title="Pending Projects"
        value={stats.pendingProjects}
        icon="⏳"
        bgColor="bg-red-500"
      />
    </div>
    <div className="mt-6">
      <ProjectCompletionChart data={stats.projectCompletionData} />
    </div>
  </div>
);

const ProfResponsableDashboard = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">ProfResponsable Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Students Picked Topics"
        value={stats.students.picked}
        icon="👨‍🎓"
        bgColor="bg-indigo-500"
      />
      <StatCard
        title="Students Without Topics"
        value={stats.students.notPicked}
        icon="❌"
        bgColor="bg-purple-500"
      />
    </div>
    <div className="mt-6">
      <ProjectCompletionChart data={stats.projectCompletionData} />
    </div>
  </div>
);

const StudentDashboard = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Picked Topics"
        value={stats.students.picked}
        icon="✔️"
        bgColor="bg-green-500"
      />
      <StatCard
        title="Pending Topics"
        value={stats.students.notPicked}
        icon="❌"
        bgColor="bg-yellow-500"
      />
    </div>
  </div>
);

const ProfessorDashboard = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Professor Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Suggested Topics"
        value={stats.professors.suggested}
        icon="📜"
        bgColor="bg-blue-500"
      />
      <StatCard
        title="Not Suggested"
        value={stats.professors.notSuggested}
        icon="🤔"
        bgColor="bg-gray-500"
      />
    </div>
  </div>
);

// Main Component
const Home = () => {
  const [userRole, setUserRole] = useState("Admin");
  const [selectedDepartment, setSelectedDepartment] = useState("GenieLogiciel");

  const departments = Object.keys(mockProjectStats.departments);
  const stats = mockProjectStats.departments[selectedDepartment];

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <div className="bg-white shadow-sm py-4 flex justify-center space-x-4 mb-6">
        {["Admin", "Student", "Professor", "ProfResponsable"].map((role) => (
          <button
            key={role}
            onClick={() => setUserRole(role)}
            className={`px-6 py-2 rounded ${
              userRole === role
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
      <main className="container mx-auto p-6">
        {userRole === "Admin" && (
          <AdminDashboard
            stats={stats}
            departments={departments}
            setDepartment={setSelectedDepartment}
          />
        )}
        {userRole === "Student" && <StudentDashboard stats={stats} />}
        {userRole === "Professor" && <ProfessorDashboard stats={stats} />}
        {userRole === "ProfResponsable" && <ProfResponsableDashboard stats={stats} />}
      </main>
    </div>
  );
};

export default Home;
