import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AuthenticatedRoute;
