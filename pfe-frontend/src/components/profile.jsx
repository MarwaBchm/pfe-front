import React from "react";
import { Helmet } from "react-helmet";

// Bootstrap icons (if you are using Bootstrap Icons)
import "bootstrap-icons/font/bootstrap-icons.css";

const ProfilePage = () => {
  // Example user data
  const user = {
    profileImage: "https://via.placeholder.com/150",
    name: "Ahmed Mohammed",
    email: "ahmed@example.com",
    jobTitle: "Software Engineer Master2",
    location: "Tlemcen, Remchi",
    phone: "+213 0796757747",
    bio: "A passionate software engineer with 5 years of experience in building scalable web applications. Loves coffee, hiking, and open-source contributions.",
    skills: ["JavaScript", "React", "Node.js", "Python", "Docker"],
    socials: {
      linkedin: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  };

  return (
    <>
      {/* Page metadata */}
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{user.name} - Profile</title>
      </Helmet>

      {/* Profile card */}
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-3">
          <div className="row align-items-center">
            {/* Profile image and basic info */}
            <div className="col-md-4 text-center">
              <img
                src={user.profileImage}
                alt="Profile"
                className="rounded-circle img-fluid border border-primary"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <h4 className="mt-3">{user.name}</h4>
              <p className="text-muted">{user.jobTitle}</p>
            </div>

            {/* About, contact, skills, and social links */}
            <div className="col-md-8">
              <h5>About Me</h5>
              <p>{user.bio}</p>

              <h5>Contact Info</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Email: </strong>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-decoration-none"
                  >
                    {user.email}
                  </a>
                </li>
                <li>
                  <strong>Phone: </strong>
                  {user.phone}
                </li>
                <li>
                  <strong>Location: </strong>
                  {user.location}
                </li>
              </ul>

              <h5>Skills</h5>
              <ul className="list-inline">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="list-inline-item badge bg-primary text-light me-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <h5>Social Links</h5>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <a
                    href={user.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-linkedin text-primary"></i> LinkedIn
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a
                    href={user.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-github text-dark"></i> GitHub
                  </a>
                </li>
                <li className="list-inline-item ms-3">
                  <a
                    href={user.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-twitter text-info"></i> Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
