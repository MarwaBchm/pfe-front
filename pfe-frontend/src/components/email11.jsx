import React, { useState, useEffect } from "react";

const PFEEmailNotification = () => {
  const [students, setStudents] = useState([]); // List of students
  const [projects, setProjects] = useState([]); // List of PFE projects
  const [selectedOption, setSelectedOption] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // Generated email
  const [formStatus, setFormStatus] = useState(""); // Form status
  const [customSubject, setCustomSubject] = useState(""); // Custom subject input
  const [customMessage, setCustomMessage] = useState(""); // Custom message input

  useEffect(() => {
    // Simulate fetching data from the database (students and projects)
    setStudents([
      {
        id: 1,
        name: "Étudiant 1",
        email: "etudiant1@example.com",
        option: "GL",
      },
      {
        id: 2,
        name: "Étudiant 2",
        email: "etudiant2@example.com",
        option: "IA",
      },
      {
        id: 3,
        name: "Étudiant 3",
        email: "etudiant3@example.com",
        option: "RSD",
      },
      {
        id: 4,
        name: "Étudiant 4",
        email: "etudiant4@example.com",
        option: "SIC",
      },
    ]);

    setProjects([
      {
        id: 1,
        name: "PFE 1",
        option: "GL",
        description: "Développement d'une application mobile",
      },
      {
        id: 2,
        name: "PFE 2",
        option: "GL",
        description: "Développement d'un logiciel de gestion",
      },
      {
        id: 3,
        name: "PFE 3",
        option: "IA",
        description: "Création d'un modèle d'intelligence artificielle",
      },
      {
        id: 4,
        name: "PFE 4",
        option: "IA",
        description: "Analyse des données avec IA",
      },
      {
        id: 5,
        name: "PFE 5",
        option: "RSD",
        description: "Optimisation des réseaux de données",
      },
      {
        id: 6,
        name: "PFE 6",
        option: "RSD",
        description: "Sécurisation des systèmes distribués",
      },
      {
        id: 7,
        name: "PFE 7",
        option: "SIC",
        description: "Mise en place d'infrastructures cloud",
      },
      {
        id: 8,
        name: "PFE 8",
        option: "SIC",
        description: "Gestion de systèmes d'information complexes",
      },
    ]);
  }, []);

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGenerateEmail = () => {
    if (!selectedOption) {
      setFormStatus("Veuillez sélectionner une option.");
      return;
    }

    // Filter projects based on the selected option
    const filteredProjects = projects.filter(
      (project) => project.option === selectedOption
    );

    if (filteredProjects.length === 0) {
      setFormStatus("Aucun projet n'est disponible pour cette option.");
      return;
    }

    // Create a personalized email for each student
    const emailMessages = students
      .filter((student) => student.option === selectedOption)
      .map((student) => {
        const projectList = filteredProjects
          .map((project) => `- ${project.name} : ${project.description}`)
          .join("\n");

        const subject =
          customSubject ||
          `Choisissez un PFE pour votre option ${selectedOption}`;
        const emailMessage = customMessage
          ? `
            Bonjour ${student.name},

            ${customMessage}

            Voici la liste des PFE disponibles pour votre option ${selectedOption} :

            ${projectList}

            Merci de faire votre choix sur la plateforme.

            Cordialement,
            L’équipe de gestion des PFE
          `
          : `
            Bonjour ${student.name},

            Vous avez la possibilité de choisir parmi les projets de fin d'études proposés pour votre option ${selectedOption}.

            Voici la liste des PFE disponibles :

            ${projectList}

            Merci de faire votre choix sur la plateforme.

            Cordialement,
            L’équipe de gestion des PFE
          `;

        return {
          subject,
          emailMessage,
          recipient: student.email,
        };
      });

    // Update the generated email
    setGeneratedEmail(emailMessages);
    setFormStatus("Emails générés avec succès !");
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
          Notification par Email pour le Choix du PFE
        </h3>

        <div className="p-6">
          <div className="mb-4">
            <label
              htmlFor="option"
              className="block text-lg font-medium text-gray-700"
            >
              Sélectionner l'option des étudiants :
            </label>
            <select
              id="option"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedOption}
              onChange={handleSelectOption}
            >
              <option value="">Choisir une option</option>
              <option value="GL">Génie Logiciel (GL)</option>
              <option value="IA">Intelligence Artificielle (IA)</option>
              <option value="RSD">
                Réseaux et Systèmes Distributeurs (RSD)
              </option>
              <option value="SIC">
                Systèmes Informatiques et Communication (SIC)
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="customMessage"
              className="block text-lg font-medium text-gray-700"
            >
              Message personnalisé (optionnel) :
            </label>
            <textarea
              id="customMessage"
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter a custom message for the students here (optional)..."
            />
          </div>

          <button
            onClick={handleGenerateEmail}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            submit
          </button>

          {formStatus && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                formStatus.includes("succès")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {formStatus}
            </div>
          )}

          {/* Display generated emails */}
          {generatedEmail && (
            <div className="mt-6">
              <h5 className="text-lg font-semibold">Emails générés :</h5>
              {generatedEmail.map((email, index) => (
                <div
                  key={index}
                  className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300"
                >
                  <h6 className="font-medium">À : {email.recipient}</h6>
                  <p className="mt-1">
                    <strong>Objet:</strong> {email.subject}
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap">
                    {email.emailMessage}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PFEEmailNotification;
