import React, { useState } from "react";
import { Line } from "react-chartjs-2"; // Import the Line chart component
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
  totalProjects: 42,
  completedProjects: 28,
  inProgressProjects: 12,
  pendingProjects: 2,
  departmentBreakdown: [
    { name: "Computer Science", projects: 15 },
    { name: "Electrical Engineering", projects: 10 },
    { name: "Mechanical Engineering", projects: 8 },
    { name: "Business", projects: 9 },
  ],
  supervisorLoad: [
    { name: "Dr. Smith", projectCount: 6 },
    { name: "Prof. Johnson", projectCount: 5 },
    { name: "Dr. Lee", projectCount: 4 },
  ],
  // New data for the line chart (e.g., project completion over time)
  projectCompletionData: [
    { date: "Jan", completed: 5, inProgress: 7 },
    { date: "Feb", completed: 8, inProgress: 9 },
    { date: "Mar", completed: 12, inProgress: 10 },
    { date: "Apr", completed: 15, inProgress: 11 },
    { date: "May", completed: 18, inProgress: 12 },
    { date: "Jun", completed: 22, inProgress: 14 },
    { date: "Jul", completed: 28, inProgress: 15 },
  ],
};

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="text-2xl text-blue-500 w">{icon}</div>
    </div>
  );
}

function DepartmentBreakdown({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Department Project Distribution
      </h2>
      <div className="space-y-2">
        {data.map((dept, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{dept.name}</span>
            <span className="font-bold text-blue-600">{dept.projects}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupervisorLoadChart({ data }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Supervisor Project Load</h2>
      <div className="space-y-2">
        {data.map((supervisor, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{supervisor.name}</span>
            <span className="font-bold text-green-600">
              {supervisor.projectCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Line Chart Component
function ProjectCompletionChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.date), // Use the dates for the x-axis
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
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Project Proposal Over Time</h2>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
}

function Home() {
  const [stats] = useState(mockProjectStats);

  return (
    <div className="min-h-screen px-4 w-full ">
      <div className="container mx-auto  w-full">
        <h1 className="text-xl font-bold mb-6 text-green-1">
          Good evening , our dear Admin!☺️
        </h1>

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
            title="Refused projects"
            value={stats.inProgressProjects}
            icon="🔄"
          />
          <StatCard title="Pending" value={stats.pendingProjects} icon="⏳" />
        </div>

        {/* Add the Project Completion Chart here */}
        <div className="w-3/5 mb-5 flex flex-row justify-between">
          <ProjectCompletionChart data={stats.projectCompletionData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <DepartmentBreakdown data={stats.departmentBreakdown} />
          <SupervisorLoadChart data={stats.supervisorLoad} />
        </div>
      </div>
    </div>
  );
}

export default Home;
