import React, { useState } from "react";

const SubjectsManagement = () => {
  const [userRole, setUserRole] = useState("Professor"); // Default view//Student//Professor
  const [popupContent, setPopupContent] = useState(null);

  // Add the popup handlers here
  const handleShowPopup = (topic) => {
    setPopupContent(topic); // Set the selected topic for the popup
  };

  const handleClosePopup = () => {
    setPopupContent(null); // Clear popup content to close it
  };

  // Topics state
  const [topics, setTopics] = useState([
    {
      id: "prof1",
      title: "Plateforme de gestion des ressources humaines avec IA",
      description:
        "Développer une plateforme RH utilisant l'intelligence artificielle pour optimiser les processus de recrutement et de gestion des talents.",
      status: "Pending",
      origin: "Professor",
      submittedBy: "Boucham Mohamed",
    },
    {
      id: "comp1",
      title: "Solution de gestion intelligente des stocks",
      description:
        "Développer un système d'optimisation des stocks en temps réel avec prédiction des besoins.",
      status: "Pending",
      origin: "Company",
      submittedBy: "Amazon",
    },
    {
      id: "stud1",
      title: "Application de suivi étudiant avec tableau de bord",
      description:
        "Créer une application pour aider les étudiants à suivre leur progression académique.",
      status: "Pending",
      origin: "Student",
      submittedBy: "John Doe",
    },
  ]);

  const [professorsData, setProfessorsData] = useState([
    { title: "Prof Topic 1", professor: "Dr. Smith" },
  ]);
  const [companiesData, setCompaniesData] = useState([
    { title: "Comp Topic 1", company: "TechCorp" },
  ]);
  const [innovativeIdea, setInnovativeIdea] = useState("");
  const [description, setDescription] = useState("");

  const handleAddIdea = () => {
    if (innovativeIdea.trim() && description.trim()) {
      setTopics([
        ...topics,
        {
          id: `custom${Date.now()}`,
          title: innovativeIdea,
          description,
          status: "Pending",
          origin: userRole,
          submittedBy: "You",
        },
      ]);
      setInnovativeIdea("");
      setDescription("");
    }
  };

  const handleRoleChange = (role) => setUserRole(role);

  const handleTopicAction = (topicId, action) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId ? { ...topic, status: action } : topic
      )
    );
  };

  const renderTopicTable = (origin) => {
    const filteredTopics = topics.filter((topic) => topic.origin === origin);

    return (
      <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mb-6 w-full">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-gray-400 border-b">
            <tr>
              <th className="py-3 text-left font-medium">Title</th>
              <th className="py-3 text-left font-medium">Submitted By</th>
              <th className="py-3 text-center font-medium">Status</th>
              <th className="py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((topic) => (
              <tr key={topic.id} className="border-t">
                <td className="py-3 px-2">{topic.title}</td>
                <td className="py-3 px-2">{topic.submittedBy}</td>
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
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Check
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 text-gray-800 w-full">

      {/* Views */}
      {userRole === "Student" && (
        <div className="space-y-10">
          {/* Suggested by Professors */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by professors</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-left">Professor Name</th>
                  <th className="py-3 text-center">Details</th>
                  <th className="py-3 text-center">Choose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title:
                      "Plateforme de gestion des ressources humaines avec IA",
                    professor: "Boucham Mohamed",
                  },
                  {
                    title: "Système de recommandation pour e-commerce",
                    professor: "Kamli Amel",
                  },
                  {
                    title: "Solution de détection de fraudes en temps réel",
                    professor: "Kazi Khadidja",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-2">{item.title}</td>
                    <td className="py-3 px-2">{item.professor}</td>
                    <td className="py-3 text-center">
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">
                        Check
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300">
                        Pick
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Suggested by Companies */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by companies</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-left">Company</th>
                  <th className="py-3 text-center">Details</th>
                  <th className="py-3 text-center">Choose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: "Solution de gestion intelligente des stocks",
                    company: "Amazon",
                  },
                  {
                    title: "Application de gestion de la relation client (CRM)",
                    company: "Salesforce",
                  },
                  {
                    title:
                      "Plateforme de recommandation de contenu personnalisé",
                    company: "Netflix",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-2">{item.title}</td>
                    <td className="py-3 px-2">{item.company}</td>
                    <td className="py-3 text-center">
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700">
                        Check
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300">
                        Pick
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Suggest an Innovative Idea */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggest an innovative idea{" "}
              <span className="text-sm text-gray-500">by you</span>
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={innovativeIdea}
                onChange={(e) => setInnovativeIdea(e.target.value)}
                placeholder="Title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleAddIdea}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {userRole === "Professor" && (
        <div className="space-y-10 px-6">
          {/* Suggest a Topic */}
          <div className="rounded-xl border border-gray-200 shadow-lg p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Suggest a Topic{" "}
              <span className="text-sm text-gray-500">by you</span>
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={innovativeIdea}
                onChange={(e) => setInnovativeIdea(e.target.value)}
                placeholder="Title"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddIdea}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 text-sm"
              >
                Add
              </button>
              <p className="text-sm text-gray-500">Status: Waiting</p>
            </div>
          </div>

          {/* Suggested by Companies */}
          <div className="rounded-xl border border-gray-200 shadow-lg p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by companies</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-left">Company</th>
                  <th className="py-3 text-center">Details</th>
                  <th className="py-3 text-center">Choose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: "Solution de gestion intelligente des stocks",
                    company: "Amazon",
                  },
                  {
                    title: "Application de gestion de la relation client (CRM)",
                    company: "Salesforce",
                  },
                  {
                    title:
                      "Plateforme de recommandation de contenu personnalisé",
                    company: "Netflix",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4">{item.company}</td>
                    <td className="py-3 text-center">
                      <button className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 text-sm">
                        Check
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <button className="bg-gray-200 text-gray-600 px-4 py-1 rounded-md hover:bg-gray-300 text-sm">
                        Pick
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Suggested by Students */}
          <div className="rounded-xl border border-gray-200 shadow-lg p-6 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by students</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-left">Student(s) Name(s)</th>
                  <th className="py-3 text-center">Details</th>
                  <th className="py-3 text-center">Choose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title:
                      "Plateforme de gestion des ressources humaines avec IA",
                    student: "Boucham Mohamed",
                  },
                  {
                    title: "Système de recommandation pour e-commerce",
                    student: "Kamli Amel",
                  },
                  {
                    title: "Solution de détection de fraudes en temps réel",
                    student: "Kazi Khadidja",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4">{item.student}</td>
                    <td className="py-3 text-center">
                      <button className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 text-sm">
                        Check
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <button className="bg-gray-200 text-gray-600 px-4 py-1 rounded-md hover:bg-gray-300 text-sm">
                        Pick
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {userRole === "Company" && (
        <div className="space-y-10">
          {/* Topics Suggested by the Company */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Topics Suggested by You
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Picked By</th>
                </tr>
              </thead>
              <tbody>
                {topics
                  .filter((topic) => topic.origin === "Company")
                  .map((topic, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-2">{topic.title}</td>
                      <td className="py-3 text-center">
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
                        {topic.status === "Validated" ? (
                          topic.submittedBy
                        ) : (
                          <span className="text-gray-400 italic">
                            Not Applicable
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {userRole === "ProfResponsable" && (
        <div className="space-y-10">
          <h2 className="text-2xl font-bold mb-4"> </h2>

          {/* Suggested by Professors */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by professors</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics
                  .filter((topic) => topic.origin === "Professor")
                  .map((topic, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-2">{topic.title}</td>
                      <td className="py-3 text-center">
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
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Check
                        </button>
                        {topic.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Validated")
                              }
                              className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                              Validate
                            </button>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Refused")
                              }
                              className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                              Refuse
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Suggested by Companies */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by companies</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics
                  .filter((topic) => topic.origin === "Company")
                  .map((topic, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-2">{topic.title}</td>
                      <td className="py-3 text-center">
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
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Check
                        </button>
                        {topic.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Validated")
                              }
                              className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                              Validate
                            </button>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Refused")
                              }
                              className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                              Refuse
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Suggested by Students */}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Suggested{" "}
              <span className="text-sm text-gray-500">by students</span>
            </h2>
            <table className="w-full text-sm text-gray-700">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">Titles</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics
                  .filter((topic) => topic.origin === "Student")
                  .map((topic, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-2">{topic.title}</td>
                      <td className="py-3 text-center">
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
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Check
                        </button>
                        {topic.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Validated")
                              }
                              className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                              Validate
                            </button>
                            <button
                              onClick={() =>
                                handleTopicAction(topic.id, "Refused")
                              }
                              className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                              Refuse
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsManagement;
