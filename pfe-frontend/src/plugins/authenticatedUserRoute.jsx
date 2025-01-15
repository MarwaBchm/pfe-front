import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthenticatedRoute;
