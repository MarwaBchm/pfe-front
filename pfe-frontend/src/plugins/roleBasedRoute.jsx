import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ rolesAllowed, userRole, isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!rolesAllowed.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default RoleBasedRoute;
