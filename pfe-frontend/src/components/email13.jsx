import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

const PFEInfoNotification = () => {
  const [students, setStudents] = useState([]); // Liste des étudiants
  const [teachers, setTeachers] = useState([]); // Liste des enseignants
  const [companies, setCompanies] = useState([]); // Liste des entreprises
  const [projects, setProjects] = useState([]); // Liste des projets PFE
  const [generatedEmails, setGeneratedEmails] = useState(""); // Emails générés
  const [formStatus, setFormStatus] = useState(""); // Statut du formulaire

  useEffect(() => {
    // Simuler la récupération des données depuis la base (étudiants, enseignants, entreprises, projets)
    setStudents([
      {
        id: 1,
        name: "Étudiant 1",
        email: "etudiant1@example.com",
        projectId: 1,
      },
      {
        id: 2,
        name: "Étudiant 2",
        email: "etudiant2@example.com",
        projectId: 2,
      },
    ]);
    setTeachers([
      {
        id: 1,
        name: "Enseignant 1",
        email: "enseignant1@example.com",
        projectIds: [1],
      },
      {
        id: 2,
        name: "Enseignant 2",
        email: "enseignant2@example.com",
        projectIds: [2],
      },
    ]);
    setCompanies([
      {
        id: 1,
        name: "Entreprise 1",
        email: "entreprise1@example.com",
        projectIds: [1],
      },
      {
        id: 2,
        name: "Entreprise 2",
        email: "entreprise2@example.com",
        projectIds: [2],
      },
    ]);
    setProjects([
      {
        id: 1,
        name: "PFE 1",
        date: "2024-12-15",
        time: "10:00",
        room: "Salle A",
        students: [1],
        teachers: [1],
        companies: [1],
      },
      {
        id: 2,
        name: "PFE 2",
        date: "2024-12-16",
        time: "14:00",
        room: "Salle B",
        students: [2],
        teachers: [2],
        companies: [2],
      },
    ]);
  }, []);

  const handleGenerateEmails = () => {
    const emailMessages = [];

    // Générer les emails pour les étudiants
    students.forEach((student) => {
      const studentProject = projects.find(
        (project) => project.id === student.projectId
      );
      if (studentProject) {
        const message = `
          Bonjour ${student.name},

          Voici les informations pour votre présentation de PFE :
          - Projet : ${studentProject.name}
          - Date : ${studentProject.date}
          - Heure : ${studentProject.time}
          - Salle : ${studentProject.room}

          Merci de vous préparer en conséquence.

          Cordialement,
          L’équipe de gestion des PFE
        `;
        emailMessages.push({
          subject: `Informations sur votre PFE - ${studentProject.name}`,
          message,
          recipient: student.email,
        });
      }
    });

    // Générer les emails pour les enseignants
    teachers.forEach((teacher) => {
      teacher.projectIds.forEach((projectId) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          const message = `
            Bonjour ${teacher.name},

            Voici les informations concernant le projet PFE supervisé par vous :
            - Projet : ${project.name}
            - Date : ${project.date}
            - Heure : ${project.time}
            - Salle : ${project.room}

            Merci pour votre suivi et votre préparation.

            Cordialement,
            L’équipe de gestion des PFE
          `;
          emailMessages.push({
            subject: `Informations sur le PFE supervisé - ${project.name}`,
            message,
            recipient: teacher.email,
          });
        }
      });
    });

    // Générer les emails pour les entreprises
    companies.forEach((company) => {
      company.projectIds.forEach((projectId) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          const message = `
            Bonjour ${company.name},

            Voici les informations concernant le projet PFE en partenariat avec votre entreprise :
            - Projet : ${project.name}
            - Date : ${project.date}
            - Heure : ${project.time}
            - Salle : ${project.room}

            Merci pour votre collaboration.

            Cordialement,
            L’équipe de gestion des PFE
          `;
          emailMessages.push({
            subject: `Informations sur le PFE en partenariat - ${project.name}`,
            message,
            recipient: company.email,
          });
        }
      });
    });

    // Mise à jour de l'état avec les emails générés
    setGeneratedEmails(emailMessages);
    setFormStatus("Emails générés avec succès !");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-warning text-white text-center">
          <h4>Notification par Email pour les Informations de PFE</h4>
        </div>
        <div className="card-body">
          <button
            onClick={handleGenerateEmails}
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

          {/* Affichage des emails générés */}
          {generatedEmails && (
            <div className="mt-3">
              <h5>Emails générés :</h5>
              {generatedEmails.map((email, index) => (
                <div key={index} className="alert alert-secondary">
                  <h6>À : {email.recipient}</h6>
                  <p>
                    <strong>Objet:</strong> {email.subject}
                  </p>
                  <pre>{email.message}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PFEInfoNotification;
