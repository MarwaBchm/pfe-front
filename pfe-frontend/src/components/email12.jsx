import React, { useState } from "react";

const PFEEmailNotification2 = () => {
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
    console.log(`Email sent to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content}`);
  };

  const handleGenerateEmail = () => {
    const emailMessages = assignments.map((assignment) => {
      // Send emails to the teachers
      const teacherEmails = [
        assignment.encadrant,
        assignment.president,
        assignment.examinateur,
      ];

      const teacherMessages = teacherEmails.map((teacher) => {
        if (teacher) {
          const emailContent = `
            Hello ${teacher.name},

            You have been assigned as ${teacher.role} for the following project:
            - Project: ${assignment.project.name}
            - Student: ${
              students.find(
                (student) => student.projectId === assignment.project.id
              ).name
            }

            Best regards,
            The PFE Management Team
          `;
          sendEmail(
            teacher.email,
            `Jury Assignment for PFE - ${assignment.project.name}`,
            emailContent
          );
          return {
            subject: `Jury Assignment for PFE - ${assignment.project.name}`,
            emailMessage: emailContent,
            recipient: teacher.email,
          };
        }
      });

      // Send email to the student
      const student = students.find(
        (student) => student.projectId === assignment.project.id
      );
      const studentEmailContent = `
        Hello ${student.name},

        Here is the composition of your jury for the defense of your project:
        - President: ${assignment.president.name}
        - Examiner: ${assignment.examinateur.name}
        - Supervisor: ${assignment.encadrant.name}

        Please prepare for your defense.

        Best regards,
        The PFE Management Team
      `;
      sendEmail(
        student.email,
        `PFE Jury Composition - ${assignment.project.name}`,
        studentEmailContent
      );

      return {
        subject: `PFE Jury Composition - ${assignment.project.name}`,
        emailMessage: studentEmailContent,
        recipient: student.email,
      };
    });

    setGeneratedEmail(emailMessages);
    setFormStatus("Emails generated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Email Notification for PFE Jury Assignment
      </h3>

      <div className="p-6">
        <button
          onClick={handleGenerateEmail}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate Jury Assignment Emails
        </button>

        {formStatus && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              formStatus.includes("successfully")
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {formStatus}
          </div>
        )}

        {/* Display generated emails */}
        {generatedEmail.length > 0 && (
          <div className="mt-4">
            <h5 className="text-xl font-semibold">Generated Emails:</h5>
            {generatedEmail.map((email, index) => (
              <div
                key={index}
                className="mt-4 p-4 border border-gray-300 rounded-lg"
              >
                <h6 className="font-semibold">To: {email.recipient}</h6>
                <p className="text-sm">
                  <strong>Subject:</strong> {email.subject}
                </p>
                <pre className="mt-2 text-sm">{email.emailMessage}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PFEEmailNotification2;
