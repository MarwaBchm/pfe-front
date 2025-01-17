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
    all: {
      totalProjects: 42,
      completedProjects: 28,
      inProgressProjects: 12,
      pendingProjects: 2,
      students: { picked: 32, notPicked: 10 },
      professors: { suggested: 8, notSuggested: 4 },
      topics: { chosen: 30, notChosen: 12 },
      projectCompletionData: [
        { date: "Jan", completed: 5, inProgress: 7 },
        { date: "Feb", completed: 8, inProgress: 9 },
        { date: "Mar", completed: 12, inProgress: 10 },
        { date: "Apr", completed: 15, inProgress: 11 },
        { date: "May", completed: 18, inProgress: 12 },
        { date: "Jun", completed: 22, inProgress: 14 },
        { date: "Jul", completed: 28, inProgress: 15 },
      ],
    },
    GenieLogiciel: {
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
    ArtificialIntelegence: {
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

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-4xl text-blue-500">{icon}</div>
    </div>
  );
}

function ProjectCompletionChart({ data }) {
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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Project Proposal Over Time</h2>
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
}

function AdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const stats = mockProjectStats.departments[selectedDepartment];

  return (
    <div className="min-h-screen w-full ">
      <main className="container mx-auto p-6">
        {/* Department Switcher */}
        <div className="flex justify-between mb-6 w-full">
          {Object.keys(mockProjectStats.departments).map((dept) => (
            <button
              key={dept}
              className={`px-9 py-2 rounded ${
                selectedDepartment === dept
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow-md text-slate-700"
              }`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept === "all" ? "All Majors" : dept}
            </button>
          ))}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon="📊"
          />
          <StatCard
            title="Validated Projects"
            value={stats.completedProjects}
            icon="✅"
          />
          <StatCard
            title="Proposed Projects"
            value={stats.inProgressProjects}
            icon="🔄"
          />
          <StatCard title="Pending" value={stats.pendingProjects} icon="⏳" />
        </div>

        {/* Project Completion Chart */}
        <div className="w-[65%] mb-10">
          <ProjectCompletionChart data={stats.projectCompletionData} />
        </div>

        {/* Additional Stats */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Students Picked Topics"
            value={stats.students.picked}
            icon="👨‍🎓"
          />
          <StatCard
            title="Students Didn't Pick"
            value={stats.students.notPicked}
            icon="❌"
          />
          <StatCard
            title="Professors Suggested Topics"
            value={stats.professors.suggested}
            icon="📜"
          />
          <StatCard
            title="Professors Didn't Suggest"
            value={stats.professors.notSuggested}
            icon="🤔"
          />
          <StatCard
            title="Topics Chosen"
            value={stats.topics.chosen}
            icon="✔️"
          />
          <StatCard
            title="Topics Not Chosen"
            value={stats.topics.notChosen}
            icon="🚫"
          />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
