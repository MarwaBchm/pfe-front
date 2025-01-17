import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const PFE_PROJECTS = [
  "Machine Learning Recommendation System",
  "IoT Smart Home Automation Platform",
  "Blockchain-based Academic Credential Verification",
  "AR/VR Educational Training Simulator",
  "AI-Powered Mental Health Chatbot",
  "Cybersecurity Network Threat Detection System",
  "Sustainable Energy Consumption Tracker",
  "Autonomous Drone Delivery Routing Algorithm",
  "Personalized Learning Path Recommendation Engine",
  "Healthcare Data Interoperability Platform",
];

const DraggableItem = ({ text, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "PROJECT",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "PROJECT",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex flex-row  justify-between items-start p-4 mb-2 bg-white border rounded-xl shadow transition-all duration-1000  font-sans
        ${isDragging ? "opacity-50 scale-105" : "opacity-100"}
        cursor-move hover:bg-blue-50`}
    >
      {text}
      <img src='/icons/delete.png' className=" w-2"/>
    </div>
  );
};

const StudentWishList = () => {
  const [projects, setProjects] = useState(PFE_PROJECTS);

  const moveItem = (fromIndex, toIndex) => {
    const updatedProjects = [...projects];
    const [removed] = updatedProjects.splice(fromIndex, 1);
    updatedProjects.splice(toIndex, 0, removed);
    setProjects(updatedProjects);
  };

  return (
    <div className=" flex flex-row w-full">
      <div className="p-6  min-h-screen  w-1/2">
      <DndProvider backend={HTML5Backend}>
        <div>
          {projects.map((project, index) => (
            <DraggableItem
              key={project}
              text={project}
              index={index}
              moveItem={moveItem}
            />
          ))}
        </div>
      </DndProvider>
      <div className="mt-6 text-center text-gray-500">
        <p>Drag and drop to reorder your project preferences</p>
      </div>
    </div>
    <div className=" flex flex-col pt-5">
      <div className="flex rounded mx-10 w-full bg-white">

      </div>
    </div>
    </div>
  );
};

export default StudentWishList;
