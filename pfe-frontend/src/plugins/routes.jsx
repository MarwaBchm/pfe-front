import { Route, Routes } from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../layouts/dashboardLayout";
import Home from "../components/home";
import UsersManagement from "../components/usersManagement";
import SubjectsManagement from "../components/subjectsManagement";
import Emails from "../components/emails";
import DefenseSchedule from "../components/defenseSchedule";
import Deadlines from "../components/deadlines";
import Settings from "../components/settings";
import WishList from "../components/wishList";
import Unauthorized from "../pages/unauthorized";
import AuthenticatedRoute from "./authenticatedUserRoute";
import RoleBasedRoute from "./roleBasedRoute";
import Cookies from "js-cookie";

const AppRoutes = () => {
  const authToken = Cookies.get("authToken"); // Check for the token
  const isAuthenticated = !!authToken; // Boolean value for authentication
  const user = Cookies.get("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userRole = parsedUser?.role || "No role found";

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/error" element={<Unauthorized />} />

      <Route
        path="/dashboard"
        element={
          <AuthenticatedRoute isAuthenticated={isAuthenticated}>
            <Dashboard />
          </AuthenticatedRoute>
        }
      >
        <Route path="home" element={<Home />} />

        <Route
          element={
            <RoleBasedRoute
              rolesAllowed={["admin"]}
              userRole={userRole}
              isAuthenticated={isAuthenticated}
            />
          }
        >  
          <Route path="usersManagement" element={<UsersManagement />} />
          <Route path="emails" element={<Emails />} />
          <Route path="deadlines" element={<Deadlines />} />
        </Route>

        <Route path="subjectsManagement" element={<SubjectsManagement />} />
        <Route path="defenseSchedule" element={<DefenseSchedule />} />
        <Route path="settings" element={<Settings />} />
        <Route path="wishList" element={<WishList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
