import React, { useState } from "react";

// Popup Component for Viewing Details
const Popup = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg">
        <h2 className="text-lg font-bold mb-4">{content.title}</h2>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {content.description}</p>
        {content.tools && <p className="text-gray-700 mb-4"><strong>Tools:</strong> {content.tools}</p>}
        {content.requirements && (
          <div className="text-gray-700 mb-4">
            <strong>Requirements:</strong>
            <ul className="list-disc pl-5">
              {content.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        {content.teamMate && (
          <p className="text-gray-700 mb-4"><strong>Team Mate:</strong> {content.teamMate}</p>
        )}
        {content.reason && (
          <p className="text-red-500 italic mb-4">Refusal Reason: {content.reason}</p>
        )}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Popup for ProfResponsable to Refuse Topics
const RefusalPopup = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason("");
      onClose();
    } else {
      alert("Please provide a reason for refusal.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-md">
        <h3 className="text-lg font-bold mb-4">Enter Refusal Reason</h3>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for refusal"
          className="w-full border px-3 py-2 mb-4 rounded-md"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SubjectsManagement = () => {
  const [userRole, setUserRole] = useState("ProfResponsable"); // Change role : ProfResponsable - Student - Company - Professor
  const [popupContent, setPopupContent] = useState(null);
  const [refusalPopup, setRefusalPopup] = useState(null);

  const [topics, setTopics] = useState([
    {
      id: "prof1",
      title: "AI for Recruitment",
      description: "Optimize recruitment processes with AI.",
      status: "Pending",
      origin: "Professor",
      submittedBy: "Dr. Smith",
      tools: "Python, TensorFlow",
      requirements: ["Dataset of job applications", "Cloud storage"],
    },
    {
      id: "comp1",
      title: "Smart Stock Management",
      description: "Real-time inventory optimization.",
      status: "Pending",
      origin: "Company",
      submittedBy: "Amazon",
    },
    {
      id: "stud1",
      title: "AI Study Assistant",
      description: "AI-powered assistant for students.",
      status: "Pending",
      origin: "Student",
      submittedBy: "John Doe",
      teamMate: "Jane Smith",
    },
  ]);

  const studentsDatabase = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Martin",
    "Charlie Brown",
    "Lucy Van Pelt",
    "David Lee",
    "Emily Davis",
    "Eve Clark",
    "Frank Wright",
  ];

  const [newTopic, setNewTopic] = useState({
    title: "",
    description: "",
    teamMate: "",
    tools: "",
    requirements: "",
  });

  const [suggestedStudents, setSuggestedStudents] = useState([]);

  const handleShowPopup = (topic) => setPopupContent(topic);
  const handleClosePopup = () => setPopupContent(null);

  const handleRefusalSubmit = (reason) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === refusalPopup.id ? { ...topic, status: "Refused", reason } : topic
      )
    );
    setRefusalPopup(null);
  };

  const handleTopicAction = (topicId, action) => {
    if (action === "Refused") {
      setRefusalPopup(topics.find((topic) => topic.id === topicId));
    } else {
      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === topicId ? { ...topic, status: action } : topic
        )
      );
    }
  };

  const handleStudentInput = (value) => {
    setNewTopic({ ...newTopic, teamMate: value });
    if (value.trim()) {
      const suggestions = studentsDatabase.filter((name) =>
        name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestedStudents(suggestions);
    } else {
      setSuggestedStudents([]);
    }
  };

  const handleAddIdea = () => {
    if (newTopic.title.trim() && newTopic.description.trim()) {
      const requirementsArray =
        newTopic.requirements.trim() !== ""
          ? newTopic.requirements.split(",").map((req) => req.trim())
          : [];

      setTopics((prevTopics) => [
        ...prevTopics,
        {
          id: `custom${Date.now()}`,
          title: newTopic.title,
          description: newTopic.description,
          status: "Pending",
          origin: userRole,
          submittedBy: "You",
          tools: userRole === "Professor" ? newTopic.tools : undefined,
          requirements: userRole === "Professor" ? requirementsArray : undefined,
          teamMate: userRole === "Student" ? newTopic.teamMate : undefined,
        },
      ]);
      setNewTopic({ title: "", description: "", teamMate: "", tools: "", requirements: "" });
      setSuggestedStudents([]);
    }
  };

  const renderTopicTable = (title, filterFn, showPick = false) => (
    <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mb-6 w-full">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <table className="w-full text-sm text-gray-700">
        <thead className="text-gray-400 border-b">
          <tr>
            <th className="py-3 text-left font-medium">Title</th>
            <th className="py-3 text-left font-medium">Submitted By</th>
            {userRole === "Student" && <th className="py-3 text-left font-medium">Team Mate</th>}
            <th className="py-3 text-center font-medium">Status</th>
            <th className="py-3 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filterFn().map((topic) => (
            <tr key={topic.id} className="border-t">
              <td className="py-3 px-2">{topic.title}</td>
              <td className="py-3 px-2">{topic.submittedBy}</td>
              {userRole === "Student" && <td className="py-3 px-2">{topic.teamMate || "N/A"}</td>}
              <td className="py-3 px-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    topic.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : topic.status === "Validated"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {topic.status}
                </span>
              </td>
              <td className="py-3 text-center">
                <button
                  onClick={() => handleShowPopup(topic)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Check
                </button>
                {showPick && (
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                    Pick
                  </button>
                )}
                {userRole === "ProfResponsable" && topic.status === "Pending" && (
                  <div className="inline-block ml-2">
                    <button
                      onClick={() => handleTopicAction(topic.id, "Validated")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                    >
                      Validate
                    </button>
                    <button
                      onClick={() => handleTopicAction(topic.id, "Refused")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Refuse
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-8 min-h-screen bg-gray-50 text-gray-800 w-full">
      {/* Popup */}
      <Popup content={popupContent} onClose={handleClosePopup} />
      {refusalPopup && (
        <RefusalPopup
          onClose={() => setRefusalPopup(null)}
          onSubmit={handleRefusalSubmit}
        />
      )}

      {/* Role-Based Views */}
      {userRole === "Student" && (
        <>
          {renderTopicTable("Suggested by Professors", () =>
            topics.filter((t) => t.origin === "Professor"),
            true
          )}
          {renderTopicTable("Suggested by Companies", () =>
            topics.filter((t) => t.origin === "Company"),
            true
          )}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4">Suggest a New Topic</h3>
            <input
              type="text"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              placeholder="Title"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <textarea
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              placeholder="Description"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <div className="relative">
              <input
                type="text"
                value={newTopic.teamMate}
                onChange={(e) => handleStudentInput(e.target.value)}
                placeholder="Team Mate"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              {suggestedStudents.length > 0 && (
                <ul className="absolute bg-white border rounded-md shadow-md w-full z-10">
                  {suggestedStudents.map((name, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setNewTopic({ ...newTopic, teamMate: name });
                        setSuggestedStudents([]);
                      }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleAddIdea}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Idea
            </button>
          </div>
        </>
      )}

      {userRole === "Professor" && (
        <>
          {renderTopicTable("Suggested by Students", () =>
            topics.filter((t) => t.origin === "Student"),
            true
          )}
          {renderTopicTable("Suggested by Companies", () =>
            topics.filter((t) => t.origin === "Company"),
            true
          )}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4">Suggest a New Topic</h3>
            <input
              type="text"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              placeholder="Title"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <textarea
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              placeholder="Description"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <input
              type="text"
              value={newTopic.tools}
              onChange={(e) => setNewTopic({ ...newTopic, tools: e.target.value })}
              placeholder="Tools (comma-separated)"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <textarea
              value={newTopic.requirements}
              onChange={(e) => setNewTopic({ ...newTopic, requirements: e.target.value })}
              placeholder="Requirements (comma-separated)"
              className="w-full border px-3 py-2 mb-4 rounded-md"
            />
            <button
              onClick={handleAddIdea}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Idea
            </button>
          </div>
        </>
      )}

      {userRole === "Company" && (
        <>
          {renderTopicTable("Your Suggested Topics", () =>
            topics.filter((t) => t.origin === "Company")
          )}
        </>
      )}

      {userRole === "ProfResponsable" && (
        <>
          {renderTopicTable("Professor Topics", () =>
            topics.filter((t) => t.origin === "Professor")
          )}
          {renderTopicTable("Company Topics", () =>
            topics.filter((t) => t.origin === "Company")
          )}
          {renderTopicTable("Student Topics", () =>
            topics.filter((t) => t.origin === "Student")
          )}
        </>
      )}
    </div>
  );
};

export default SubjectsManagement;
