import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaGripVertical } from "react-icons/fa";

const defenseTopics = [
  {
    title: "AI in Medical Imaging",
    details: "Exploring AI applications in diagnostic imaging.",
  },
  {
    title: "Blockchain Voting Systems",
    details: "Implementing secure and transparent voting mechanisms.",
  },
  {
    title: "IoT in Agriculture",
    details: "Using IoT to optimize agricultural practices.",
  },
  {
    title: "Cybersecurity in Cloud Computing",
    details: "Enhancing security for cloud-based services.",
  },
  {
    title: "Autonomous Vehicle Ethics",
    details: "Addressing ethical challenges in autonomous systems.",
  },
  {
    title: "Renewable Energy Optimization",
    details: "Improving efficiency in renewable energy systems.",
  },
  {
    title: "Virtual Reality for Training",
    details: "Leveraging VR for immersive training solutions.",
  },
];

function DraggableItem({ topic, index, moveItem, onIconClick }) {
  const [{ isDragging }, drag] = useDrag({
    type: "DEFENSE_TOPIC",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "DEFENSE_TOPIC",
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

function ProfessorWishList() {
  const [topics, setTopics] = useState(defenseTopics.slice(0, 7));
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
          🔥 Select your preferred defenses as jury.
        </h1>
        <p className="text-gray-3 mb-2 text-13">
          Drag and drop to prioritize the defenses you wish to attend as jury.
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
          ⚠️ You can only select 7 defenses. Make sure your choices are final
          before the deadline.
        </span>
        <span className="flex w-full rounded-xl bg-green-2 shadow text-green-950 py-1.5 px-2 text-13 justify-start items-center font-Roboto font-extralight mt-4">
          🛈 Results of your jury assignments will be sent via email 📧 on
          January 15, 2025.
        </span>
        <img
          src="/wishListProfessor.png"
          className="w-56 fixed bottom-1 right-3"
        />

        <div className="mt-4 w-full bg-white p-4 rounded-xl shadow-md ">
          {selectedTopic ? (
            <>
              <h2 className="text-lg font-bold mb-2">{selectedTopic.title}</h2>
              <p className="text-gray-700">{selectedTopic.details}</p>
            </>
          ) : (
            <p className="text-gray-700 text-14 font-Roboto">
              Discover details about the selected defense here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfessorWishList;
