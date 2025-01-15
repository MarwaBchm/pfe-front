import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ rolesAllowed, userRole }) => {
  if (!userRole) {
    // Redirect to login if user is not logged in
    return <Navigate to="/" />;
  }

  if (!rolesAllowed.includes(userRole)) {
    // Redirect to unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" />;
  }

  // Render child routes if access is granted
  return <Outlet />;
};

export default ProtectedRoute;
