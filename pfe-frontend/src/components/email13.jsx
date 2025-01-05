import React, { useState, useEffect } from "react";
import "./PEFInfoNotification.css"; // Import your custom CSS

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
        const message = `Bonjour ${student.name},\n\nVoici les informations pour votre présentation de PFE :\n- Projet : ${studentProject.name}\n- Date : ${studentProject.date}\n- Heure : ${studentProject.time}\n- Salle : ${studentProject.room}\n\nMerci de vous préparer en conséquence.\n\nCordialement,\nL’équipe de gestion des PFE`;

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
          const message = `Bonjour ${teacher.name},\n\nVoici les informations concernant le projet PFE supervisé par vous :\n- Projet : ${project.name}\n- Date : ${project.date}\n- Heure : ${project.time}\n- Salle : ${project.room}\n\nMerci pour votre suivi et votre préparation.\n\nCordialement,\nL’équipe de gestion des PFE`;

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
          const message = `Bonjour ${company.name},\n\nVoici les informations concernant le projet PFE en partenariat avec votre entreprise :\n- Projet : ${project.name}\n- Date : ${project.date}\n- Heure : ${project.time}\n- Salle : ${project.room}\n\nMerci pour votre collaboration.\n\nCordialement,\nL’équipe de gestion des PFE`;

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
    <div className="container">
      <div className="card">
        <div className="card-header notification-header">
          <h4>Notification par Email pour les Informations de PFE</h4>
        </div>
        <div className="card-body">
          <button onClick={handleGenerateEmails} className="btn btn-generate">
            Générer les emails
          </button>

          {formStatus && (
            <div
              className={`status-message ${
                formStatus.includes("succès") ? "success" : "error"
              }`}
            >
              {formStatus}
            </div>
          )}

          {/* Affichage des emails générés */}
          {generatedEmails && (
            <div className="emails-generated">
              <h5>Emails générés :</h5>
              {generatedEmails.map((email, index) => (
                <div key={index} className="email-card">
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
