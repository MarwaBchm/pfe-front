import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const OutlinedAlerts = () => {
  const [formData, setFormData] = useState({
    subject: "PFE Email",
    customMessage: "",
    type: [],
    // message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(""); // State to store the generated email content

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, type) => {
    const { checked } = e.target;
    setFormData((prevData) => {
      const newTypes = checked
        ? [...prevData.type, type]
        : prevData.type.filter((item) => item !== type);
      return { ...prevData, type: newTypes };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.subject /*|| !formData.message*/ ||
      formData.type.length === 0
    ) {
      setFormStatus("Please fill in all the required fields.");
      return;
    }

    // Generate the email message
    const emailMessage = `
      Subject: ${formData.subject}
      ---------------------------------------------------------
      Dear ${formData.type.join(", ") || "Recipient"},

      ${formData.customMessage ? `Note: ${formData.customMessage}` : ""}

      You can access the platform for more details here: http://localhost:5173/dashboard/home

      Best regards,
      PFE Management Team
    `;

    // Update the generated email
    setGeneratedEmail(emailMessage);
    setFormStatus("Email configuration successful!"); // Success message
  };

  return (
    <div className="w-full h-full relative">
      {/* Alert Section */}
      <div className="flex flex-col h-full mx-4 my-6 rounded-md p-4 bg-white">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email1/">Go to Email Settings</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email3/">Templete password</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email2/">
                Configure PFE Call Email
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email5/">PFEReminderForm</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email6/">
                Encadrement Invitation Email
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email7/">
                EncadrementInvitationForm
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email8/">
                NonSelectionNotificationForm
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email9/">PFEProposalForm</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email10/">PFEValidation</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email11/">PFEEmailNotification</a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email12/">
                l'affectation des jurys
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="http://localhost:5173/email13/">PFEEventNotification</a>
            </div>
          </div>
        </div>
      </div>
      {/* Form Section */}
      <div className="flex flex-col h-full mx-4 my-6 rounded-md p-4 bg-light">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-primary shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4>Send Email</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  {/* Subject Input */}
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject:
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      placeholder="Subject of Your Inquiry"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Type Checkbox */}
                  <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                      Send To:
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="student"
                        value="Student"
                        checked={formData.type.includes("Student")}
                        onChange={(e) => handleCheckboxChange(e, "Student")}
                      />
                      <label className="form-check-label" htmlFor="student">
                        Student
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="professor"
                        value="Professor"
                        checked={formData.type.includes("Professor")}
                        onChange={(e) => handleCheckboxChange(e, "Professor")}
                      />
                      <label className="form-check-label" htmlFor="professor">
                        Professor
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="enterprise"
                        value="Enterprise"
                        checked={formData.type.includes("Enterprise")}
                        onChange={(e) => handleCheckboxChange(e, "Enterprise")}
                      />
                      <label className="form-check-label" htmlFor="enterprise">
                        Enterprise
                      </label>
                    </div>
                  </div>

                  {/* Message Input */}
                  {/* <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder={`Hello ${
                        formData.type.join(", ") || "there"
                      },`}
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div> */}

                  {/* Custom Message Input */}
                  <div className="mb-3">
                    <label htmlFor="customMessage" className="form-label">
                      Message :
                    </label>
                    <textarea
                      id="customMessage"
                      name="customMessage"
                      className="form-control"
                      rows="4"
                      value={formData.customMessage}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>

                {/* Form Status Feedback */}
                {formStatus && (
                  <div
                    className={`mt-3 alert ${
                      formStatus.includes("successful")
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                    role="alert"
                  >
                    {formStatus}
                  </div>
                )}

                {/* Display Generated Email */}
                {generatedEmail && (
                  <div className="mt-3">
                    <h5>Generated Email Preview:</h5>
                    <div className="alert alert-secondary">
                      <pre>{generatedEmail}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutlinedAlerts;
