import { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    major: "",
    masterAverage: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState("/profile.jpg");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // Add logic to delete the account (API call or other)
      console.log("Account deleted.");
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add logic to save changes (e.g., update profile settings via API)
    console.log("Changes saved:", { ...formData, selectedImage });
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col h-full mx-4 my-6 rounded-md p-4 bg-white">
        <h2 className="text-2xl text-blue-2 font-medium mb-4">My Account</h2>
        <div className="flex flex-row w-full justify-between mx-5">
          <div className="flex flex-col w-1/3 space-y-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700 pl-1"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full text-14 text-blue-2 focus:outline-none focus:border-2 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className=" pl-1 block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="border border-gray-300 rounded-md mt-1 px-3 py-2 w-full text-14 text-blue-2 focus:outline-none focus:border-2 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-row items-center ml-6 mr-10">
            <div className=" flex flex-col mx-4">
              <button
                onClick={handleSaveChanges}
                className="mt-4 w-full bg-blue-500 bg-opacity-80 text-sm text-white py-1 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={handleDeleteAccount}
                className="mt-4 w-full bg-red-500 bg-opacity-80 text-sm text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Discard
              </button>
            </div>
            <div className="relative">
              <label
                htmlFor="imageInput"
                className="block w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500"
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <span>Select Image</span>
                  </div>
                )}
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-4 gap-4">
          <div className=" flex flex-row justify-between items-center mx-5 gap-16">
            <div className="w-full">
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700"
              >
                Major
              </label>
              <input
                id="major"
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div className=" w-full">
              <label
                htmlFor="masterAverage"
                className="block text-sm font-medium text-gray-700"
              >
                Master Average
              </label>
              <input
                id="masterAverage"
                type="text"
                name="masterAverage"
                placeholder="Master Average"
                value={formData.masterAverage}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className=" flex flex-row justify-between items-center mx-5 gap-16">
          <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
 <div>
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700"
              >
                Major
              </label>
              <input
                id="major"
                type="text"
                name="major"
                placeholder="Major"
                value={formData.major}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="masterAverage"
                className="block text-sm font-medium text-gray-700"
              >
                Master Average
              </label>
              <input
                id="masterAverage"
                type="text"
                name="masterAverage"
                placeholder="Master Average"
                value={formData.masterAverage}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          */
