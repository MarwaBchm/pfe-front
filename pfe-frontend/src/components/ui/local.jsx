import React from "react";
import Cookies from "js-cookie";

const CookieContent = () => {
  // Retrieve the cookies
  const authToken = Cookies.get("authToken");
  const user = Cookies.get("user");

  // Parse the user object if it exists
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Cookie Content</h2>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Auth Token:</h3>
          <pre className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
            {authToken ? authToken : "No authToken in cookies"}
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-medium">User Info:</h3>
          <pre className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
            {parsedUser
              ? // Render user properties individually or as a JSON string
                JSON.stringify(parsedUser, null, 2)
              : "No user info in cookies"}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CookieContent;
