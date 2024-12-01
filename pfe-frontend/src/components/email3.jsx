import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const OutlinedAlerts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFormStatus("Please fill out all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormStatus("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    console.log("Form Submitted:", formData);
    setFormStatus("Form submitted successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col h-full mx-4 my-6 rounded-md p-4 bg-white">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="\\email1.jsx">A simple </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="">A simple </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="">A simple </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="">A simple </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="alert border-primary alert-dismissible fade show">
              <a href="">A simple </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full mx-4 my-6 rounded-md p-4 bg-light">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card border-primary shadow-sm">
              <div className="card-header bg-primary text-white text-center">
                <h4>Send Email </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

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

                  {/* Message Input */}
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder="Your Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
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
                      formStatus.includes("successfully")
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                    role="alert"
                  >
                    {formStatus}
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
