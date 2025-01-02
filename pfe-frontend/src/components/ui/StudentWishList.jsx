import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaGripVertical } from "react-icons/fa";

const projectTopics = [
  {
    title: "Machine Learning in Healthcare",
    details: "Exploring ML techniques to improve diagnostics and patient care.",
  },
  {
    title: "Blockchain for Supply Chain",
    details: "Leveraging blockchain to enhance transparency and traceability.",
  },
  {
    title: "IoT Smart Home Automation",
    details: "Developing IoT systems for efficient and smart home management.",
  },
  {
    title: "AI-Powered Educational Platform",
    details:
      "Creating AI tools to personalize and improve learning experiences.",
  },
  {
    title: "Cybersecurity Threat Detection",
    details: "Building systems to identify and mitigate cybersecurity threats.",
  },
  {
    title: "Augmented Reality Learning Tools",
    details: "Designing AR applications for interactive educational content.",
  },
  {
    title: "Sustainable Energy Management System",
    details: "Innovating energy systems for sustainable resource management.",
  },
  {
    title: "Telemedicine Application",
    details: "Developing platforms for remote healthcare consultations.",
  },
  {
    title: "Social Media Analytics Platform",
    details: "Analyzing social media data to uncover trends and insights.",
  },
  {
    title: "Autonomous Drone Navigation",
    details:
      "Creating algorithms for autonomous and efficient drone navigation.",
  },
];

function DraggableItem({ topic, index, moveItem, onIconClick }) {
  const [{ isDragging }, drag] = useDrag({
    type: "PROJECT_TOPIC",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "PROJECT_TOPIC",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 my-1 bg-white justify-between rounded-lg shadow-md cursor-move transition-opacity duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      } flex items-center space-x-3`}
    >
      <div>
        <span className="text-sm font-semibold text-green-1 font-Roboto">
          {index + 1}.
        </span>
        <span className="text-sm font-medium text-blue-1 font-Roboto pl-1">
          {topic.title}
        </span>
      </div>
      <FaGripVertical
        className="text-gray-200 cursor-pointer"
        onClick={() => onIconClick(topic)}
      />
    </div>
  );
}

function StudentWishList() {
  const [topics, setTopics] = useState(projectTopics);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const moveItem = (fromIndex, toIndex) => {
    const updatedTopics = [...topics];
    const [removed] = updatedTopics.splice(fromIndex, 1);
    updatedTopics.splice(toIndex, 0, removed);
    setTopics(updatedTopics);
  };

  return (
    <div className="flex flex-row w-full justify-start items-start">
      <div className="h-auto p-4 rounded-lg flex flex-col justify-start w-[45%]">
        <h1 className="text-xl font-bold text-slate-700">
          🔥 Here are your selected PFE projects.
        </h1>
        <p className="text-gray-3 mb-2 text-13">
          Drag and drop to prioritize your projects' order preference
        </p>
        <DndProvider backend={HTML5Backend}>
          <div className="space-y-1">
            {topics.map((topic, index) => (
              <DraggableItem
                key={topic.title}
                topic={topic}
                index={index}
                moveItem={moveItem}
                onIconClick={(topic) => setSelectedTopic(topic)}
              />
            ))}
          </div>
        </DndProvider>
      </div>
      <div className="flex flex-col justify-start items-start w-[55%] lg:pl-4 pt-6 pb-28">
        <span className="flex w-full rounded-xl bg-red-400 shadow text-red-800 py-1.5 px-2 text-13 justify-start items-center font-Roboto font-extralight">
          ⚠️ Hurry up! You have until the deadline to edit the order, so make
          sure to double-check your changes.
        </span>
        <span className="flex w-full rounded-xl bg-green-2 shadow text-green-950 py-1.5 px-2 text-13 justify-start items-center font-Roboto font-extralight mt-4">
          🛈 You will receive the result of your PFE project via email 📧 on
          January 12, 2025.
        </span>
        <img src="/wishList.png" className="w-56 fixed bottom-1 right-3" />
        
        <div className="mt-4 w-full bg-white p-4 rounded-xl shadow-md ">
          {selectedTopic ? (
            <>
              <h2 className="text-lg font-bold mb-2">{selectedTopic.title}</h2>
              <p className="text-gray-700">{selectedTopic.details}</p>
            </>
          ) : (
            <p className="text-gray-700 text-14 font-Roboto">
              Discover all the information about the project you selected right
              here!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentWishList;
