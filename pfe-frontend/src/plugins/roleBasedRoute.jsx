import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({
  rolesAllowed,
  userRole,
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  if (!rolesAllowed.includes(userRole)) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/error" />;
  }

  return children;
};

export default RoleBasedRoute;
