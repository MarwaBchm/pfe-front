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

// Binôme Validation Popup
const BinomeValidationPopup = ({ validation, onClose, onConfirm }) => {
  if (!validation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-md">
        <h3 className="text-lg font-bold mb-4">Validation de Binôme</h3>
        <p>
          <strong>{validation.from}</strong> vous a invité à travailler sur un PFE. Acceptez-vous ?
        </p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Refuser
          </button>
          <button
            onClick={() => onConfirm(validation.pfeId)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SubjectsManagement = () => {
  const [userRole, setUserRole] = useState("ProfResponsable"); // Change role: ProfResponsable - Student - Company - Professor
  const [popupContent, setPopupContent] = useState(null);
  const [refusalPopup, setRefusalPopup] = useState(null);
  const [binomeValidation, setBinomeValidation] = useState(null);

  // Existing topics state
  const [topics, setTopics] = useState([]);

  // Enseignant form state
  const [enseignantForm, setEnseignantForm] = useState({
    encadrant: "",
    coEncadrant: "",
    option: "",
    typeSujet: "",
    intitule: "",
    resume: "",
    technologies: "",
    besoinsMateriel: "",
  });

  // Étudiant form state
  const [etudiantForm, setEtudiantForm] = useState({
    etudiant1: "",
    etudiant2: "",
    option: "",
    intitule: "",
    resume: "",
    technologies: "",
    besoinsMateriel: "",
  });

  // Entreprise form state
  const [entrepriseForm, setEntrepriseForm] = useState({
    entreprise: "",
    option: "",
    intitule: "",
    resume: "",
    technologies: "",
  });


  // Handle Enseignant form submission
  const handleEnseignantSubmit = (e) => {
    e.preventDefault();
    const newPFE = {
      id: `enseignant${Date.now()}`,
      ...enseignantForm,
      status: "Pending",
      origin: "Professor",
      submittedBy: "Enseignant",
    };
    setTopics((prevTopics) => [...prevTopics, newPFE]);
    setEnseignantForm({
      encadrant: "",
      coEncadrant: "",
      option: "",
      typeSujet: "",
      intitule: "",
      resume: "",
      technologies: "",
      besoinsMateriel: "",
    });
  };

  // Handle Étudiant form submission
  const handleEtudiantSubmit = (e) => {
    e.preventDefault();
    const newPFE = {
      id: `etudiant${Date.now()}`,
      ...etudiantForm,
      status: "Pending",
      origin: "Student",
      submittedBy: etudiantForm.etudiant1,
      teamMate: etudiantForm.etudiant2,
    };
    setTopics((prevTopics) => [...prevTopics, newPFE]);
    setEtudiantForm({
      etudiant1: "",
      etudiant2: "",
      option: "",
      intitule: "",
      resume: "",
      technologies: "",
      besoinsMateriel: "",
    });

    // Send notification to binôme
    if (etudiantForm.etudiant2) {
      setBinomeValidation({
        from: etudiantForm.etudiant1,
        to: etudiantForm.etudiant2,
        pfeId: newPFE.id,
      });
    }
  };

  // Handle Entreprise form submission
  const handleEntrepriseSubmit = (e) => {
    e.preventDefault();
    const newPFE = {
      id: `entreprise${Date.now()}`,
      ...entrepriseForm,
      status: "Pending",
      origin: "Company",
      submittedBy: entrepriseForm.entreprise,
    };
    setTopics((prevTopics) => [...prevTopics, newPFE]);
    setEntrepriseForm({
      entreprise: "",
      option: "",
      intitule: "",
      resume: "",
      technologies: "",
    });
  };

  // Render topic table
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
                  onClick={() => setPopupContent(topic)}
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
      <Popup content={popupContent} onClose={() => setPopupContent(null)} />
      {refusalPopup && (
        <RefusalPopup
          onClose={() => setRefusalPopup(null)}
          onSubmit={(reason) => {
            setTopics((prevTopics) =>
              prevTopics.map((topic) =>
                topic.id === refusalPopup.id ? { ...topic, status: "Refused", reason } : topic
              )
            );
            setRefusalPopup(null);
          }}
        />
      )}
      {binomeValidation && (
        <BinomeValidationPopup
          validation={binomeValidation}
          onClose={() => setBinomeValidation(null)}
          onConfirm={(pfeId) => {
            setTopics((prevTopics) =>
              prevTopics.map((topic) =>
                topic.id === pfeId ? { ...topic, status: "Validated" } : topic
              )
            );
            setBinomeValidation(null);
          }}
        />
      )}

      {/* Role-Based Views */}
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
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mb-6">
            <h3 className="text-lg font-semibold mb-4">Soumettre un PFE</h3>
            <form onSubmit={handleEnseignantSubmit}>
              <input
                type="text"
                value={enseignantForm.encadrant}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, encadrant: e.target.value })}
                placeholder="Nom et prénom encadrant"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <input
                type="text"
                value={enseignantForm.coEncadrant}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, coEncadrant: e.target.value })}
                placeholder="Nom et prénom co-encadrant"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <select
                value={enseignantForm.option}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, option: e.target.value })}
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              >
                <option value="">Option</option>
                <option value="GL">GL</option>
                <option value="IA">IA</option>
                <option value="RSD">RSD</option>
                <option value="SIC">SIC</option>
              </select>
              <select
                value={enseignantForm.typeSujet}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, typeSujet: e.target.value })}
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              >
                <option value="">Type de sujet</option>
                <option value="classique">Classique</option>
                <option value="innovant">Innovant</option>
              </select>
              <input
                type="text"
                value={enseignantForm.intitule}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, intitule: e.target.value })}
                placeholder="Intitulé du PFE"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <textarea
                value={enseignantForm.resume}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, resume: e.target.value })}
                placeholder="Résumé"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <input
                type="text"
                value={enseignantForm.technologies}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, technologies: e.target.value })}
                placeholder="Technologies utilisées"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <input
                type="text"
                value={enseignantForm.besoinsMateriel}
                onChange={(e) => setEnseignantForm({ ...enseignantForm, besoinsMateriel: e.target.value })}
                placeholder="Besoins matériel"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Soumettre
              </button>
            </form>
          </div>
        </>
      )}

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
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mb-6">
            <h3 className="text-lg font-semibold mb-4">Proposer un PFE</h3>
            <form onSubmit={handleEtudiantSubmit}>
              <input
                type="text"
                value={etudiantForm.etudiant1}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, etudiant1: e.target.value })}
                placeholder="Nom et prénom étudiant 1"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <input
                type="text"
                value={etudiantForm.etudiant2}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, etudiant2: e.target.value })}
                placeholder="Nom et prénom étudiant 2 (binôme)"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <select
                value={etudiantForm.option}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, option: e.target.value })}
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              >
                <option value="">Option</option>
                <option value="GL">GL</option>
                <option value="IA">IA</option>
                <option value="RSD">RSD</option>
                <option value="SIC">SIC</option>
              </select>
              <input
                type="text"
                value={etudiantForm.intitule}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, intitule: e.target.value })}
                placeholder="Intitulé du PFE"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <textarea
                value={etudiantForm.resume}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, resume: e.target.value })}
                placeholder="Résumé"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <input
                type="text"
                value={etudiantForm.technologies}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, technologies: e.target.value })}
                placeholder="Technologies utilisées"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <input
                type="text"
                value={etudiantForm.besoinsMateriel}
                onChange={(e) => setEtudiantForm({ ...etudiantForm, besoinsMateriel: e.target.value })}
                placeholder="Besoins matériel"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Proposer
              </button>
            </form>
          </div>
        </>
      )}

      {userRole === "Company" && (
        <>
          {renderTopicTable("Your Suggested Topics", () =>
            topics.filter((t) => t.origin === "Company")
          )}
          <div className="rounded-xl border border-gray-200 shadow-sm p-6 bg-white mb-6">
            <h3 className="text-lg font-semibold mb-4">Proposer un Projet</h3>
            <form onSubmit={handleEntrepriseSubmit}>
              <input
                type="text"
                value={entrepriseForm.entreprise}
                onChange={(e) => setEntrepriseForm({ ...entrepriseForm, entreprise: e.target.value })}
                placeholder="Nom de l'entreprise"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <select
                value={entrepriseForm.option}
                onChange={(e) => setEntrepriseForm({ ...entrepriseForm, option: e.target.value })}
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              >
                <option value="">Option</option>
                <option value="GL">GL</option>
                <option value="IA">IA</option>
                <option value="RSD">RSD</option>
                <option value="SIC">SIC</option>
              </select>
              <input
                type="text"
                value={entrepriseForm.intitule}
                onChange={(e) => setEntrepriseForm({ ...entrepriseForm, intitule: e.target.value })}
                placeholder="Intitulé du PFE"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <textarea
                value={entrepriseForm.resume}
                onChange={(e) => setEntrepriseForm({ ...entrepriseForm, resume: e.target.value })}
                placeholder="Résumé"
                className="w-full border px-3 py-2 mb-4 rounded-md"
                required
              />
              <input
                type="text"
                value={entrepriseForm.technologies}
                onChange={(e) => setEntrepriseForm({ ...entrepriseForm, technologies: e.target.value })}
                placeholder="Technologies utilisées"
                className="w-full border px-3 py-2 mb-4 rounded-md"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Soumettre
              </button>
            </form>
          </div>
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