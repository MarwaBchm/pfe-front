import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-warning text-white text-center">
          <h4>Notification par Email pour le Choix du PFE</h4>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="option" className="form-label">
              Sélectionner l'option des étudiants :
            </label>
            <select
              id="option"
              className="form-control"
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

          {/* <div className="mb-3">
            <label htmlFor="customSubject" className="form-label">
              Sujet personnalisé (optionnel) :
            </label>
            <input
              type="text"
              id="customSubject"
              className="form-control"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
            />
          </div> */}

          <div className="mb-3">
            <label htmlFor="customMessage" className="form-label">
              Message personnalisé (optionnel) :
            </label>
            <textarea
              id="customMessage"
              className="form-control"
              rows="4"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerateEmail}
            className="btn btn-warning w-100"
          >
            Générer les emails
          </button>

          {formStatus && (
            <div
              className={`mt-3 alert ${
                formStatus.includes("succès") ? "alert-success" : "alert-danger"
              }`}
            >
              {formStatus}
            </div>
          )}

          {/* Display generated emails */}
          {generatedEmail && (
            <div className="mt-3">
              <h5>Emails générés :</h5>
              {generatedEmail.map((email, index) => (
                <div key={index} className="alert alert-secondary">
                  <h6>À : {email.recipient}</h6>
                  <p>
                    <strong>Objet:</strong> {email.subject}
                  </p>
                  <pre>{email.emailMessage}</pre>
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
