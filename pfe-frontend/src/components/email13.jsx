import React, { useState, useEffect } from "react";

const PFEInfoNotification = () => {
  const [students, setStudents] = useState([]); // List of students
  const [teachers, setTeachers] = useState([]); // List of teachers
  const [companies, setCompanies] = useState([]); // List of companies
  const [projects, setProjects] = useState([]); // List of PFE projects
  const [generatedEmails, setGeneratedEmails] = useState([]); // Generated emails
  const [formStatus, setFormStatus] = useState(""); // Form status

  useEffect(() => {
    // Simulate fetching data from the database (students, teachers, companies, projects)
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

    // Generate emails for students
    students.forEach((student) => {
      const studentProject = projects.find(
        (project) => project.id === student.projectId
      );
      if (studentProject) {
        const message = `Hello ${student.name},\n\nHere are the details for your PFE presentation:\n- Project: ${studentProject.name}\n- Date: ${studentProject.date}\n- Time: ${studentProject.time}\n- Room: ${studentProject.room}\n\nPlease prepare accordingly.\n\nBest regards,\nThe PFE Management Team`;

        emailMessages.push({
          subject: `Details of your PFE - ${studentProject.name}`,
          message,
          recipient: student.email,
        });
      }
    });

    // Generate emails for teachers
    teachers.forEach((teacher) => {
      teacher.projectIds.forEach((projectId) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          const message = `Hello ${teacher.name},\n\nHere are the details of the PFE project you are supervising:\n- Project: ${project.name}\n- Date: ${project.date}\n- Time: ${project.time}\n- Room: ${project.room}\n\nThank you for your follow-up and preparation.\n\nBest regards,\nThe PFE Management Team`;

          emailMessages.push({
            subject: `Details of the PFE Supervised - ${project.name}`,
            message,
            recipient: teacher.email,
          });
        }
      });
    });

    // Generate emails for companies
    companies.forEach((company) => {
      company.projectIds.forEach((projectId) => {
        const project = projects.find((p) => p.id === projectId);
        if (project) {
          const message = `Hello ${company.name},\n\nHere are the details of the PFE project in partnership with your company:\n- Project: ${project.name}\n- Date: ${project.date}\n- Time: ${project.time}\n- Room: ${project.room}\n\nThank you for your collaboration.\n\nBest regards,\nThe PFE Management Team`;

          emailMessages.push({
            subject: `Details of the PFE Partnership - ${project.name}`,
            message,
            recipient: company.email,
          });
        }
      });
    });

    // Update the state with generated emails
    setGeneratedEmails(emailMessages);
    setFormStatus("Emails generated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Email Notification for PFE Information
      </h3>

      <div className="p-6">
        <button
          onClick={handleGenerateEmails}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Generate Emails
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
        {generatedEmails.length > 0 && (
          <div className="mt-4">
            <h5 className="text-xl font-semibold">Generated Emails:</h5>
            {generatedEmails.map((email, index) => (
              <div
                key={index}
                className="mt-4 p-4 border border-gray-300 rounded-lg"
              >
                <h6 className="font-semibold">To: {email.recipient}</h6>
                <p className="text-sm">
                  <strong>Subject:</strong> {email.subject}
                </p>
                <pre className="mt-2 text-sm">{email.message}</pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PFEInfoNotification;
