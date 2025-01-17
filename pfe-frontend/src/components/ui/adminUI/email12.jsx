import React, { useState } from "react";
import "../../../styles/PFEEmailNotification.css";

const PFEEmailNotification = () => {
  const [assignments, setAssignments] = useState([
    {
      project: { id: 1, name: "PFE Web Development" },
      encadrant: {
        name: "Dr. A",
        email: "dr.a@example.com",
        role: "Encadrant",
      },
      president: {
        name: "Prof. B",
        email: "prof.b@example.com",
        role: "Président",
      },
      examinateur: {
        name: "Dr. C",
        email: "dr.c@example.com",
        role: "Examinateur",
      },
    },
    {
      project: { id: 2, name: "PFE AI Research" },
      encadrant: {
        name: "Prof. D",
        email: "prof.d@example.com",
        role: "Encadrant",
      },
      president: {
        name: "Dr. E",
        email: "dr.e@example.com",
        role: "Président",
      },
      examinateur: {
        name: "Prof. F",
        email: "prof.f@example.com",
        role: "Examinateur",
      },
    },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "Étudiant 1", email: "etudiant1@example.com", projectId: 1 },
    { id: 2, name: "Étudiant 2", email: "etudiant2@example.com", projectId: 2 },
  ]);

  const [generatedEmail, setGeneratedEmail] = useState([]);
  const [formStatus, setFormStatus] = useState("");

  const sendEmail = (to, subject, content) => {
    console.log(`Email envoyé à : ${to}`);
    console.log(`Objet : ${subject}`);
    console.log(`Contenu : ${content}`);
  };

  const handleGenerateEmail = () => {
    const emailMessages = assignments.map((assignment) => {
      // Envoi des emails aux enseignants
      const teacherEmails = [
        assignment.encadrant,
        assignment.president,
        assignment.examinateur,
      ];

      const teacherMessages = teacherEmails.map((teacher) => {
        if (teacher) {
          const emailContent = `
            Bonjour ${teacher.name},

            Vous avez été affecté en tant que ${
              teacher.role
            } pour le projet suivant :
            - Projet : ${assignment.project.name}
            - Etudiant : ${
              students.find(
                (student) => student.projectId === assignment.project.id
              ).name
            }

            Cordialement,
            L’équipe de gestion des PFE
          `;
          sendEmail(
            teacher.email,
            `Affectation Jury PFE - ${assignment.project.name}`,
            emailContent
          );
          return {
            subject: `Affectation Jury PFE - ${assignment.project.name}`,
            emailMessage: emailContent,
            recipient: teacher.email,
          };
        }
      });

      // Envoi de l'email à l'étudiant
      const student = students.find(
        (student) => student.projectId === assignment.project.id
      );
      const studentEmailContent = `
        Bonjour ${student.name},

        Voici la composition de votre jury pour la soutenance de votre projet :
        - Président : ${assignment.president.name}
        - Examinateur : ${assignment.examinateur.name}
        - Encadrant : ${assignment.encadrant.name}

        Merci de vous préparer pour votre soutenance.

        Cordialement,
        L’équipe de gestion des PFE
      `;
      sendEmail(
        student.email,
        `Composition Jury PFE - ${assignment.project.name}`,
        studentEmailContent
      );

      return {
        subject: `Composition Jury PFE - ${assignment.project.name}`,
        emailMessage: studentEmailContent,
        recipient: student.email,
      };
    });

    setGeneratedEmail(emailMessages);
    setFormStatus("Emails générés avec succès !");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h4>Notification par Email pour l'Affectation du Jury PFE</h4>
        </div>
        <div className="card-body">
          <button onClick={handleGenerateEmail} className="btn">
            Générer les emails d'affectation
          </button>

          {formStatus && (
            <div className={`status ${formStatus.includes("succès") ? "success" : "error"}`}>
              {formStatus}
            </div>
          )}

          {/* Affichage des emails générés */}
          {generatedEmail.length > 0 && (
            <div className="emails">
              <h5>Emails générés :</h5>
              {generatedEmail.map((email, index) => (
                <div key={index} className="email-message">
                  <h6>À : {email.recipient}</h6>
                  <p><strong>Objet:</strong> {email.subject}</p>
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
