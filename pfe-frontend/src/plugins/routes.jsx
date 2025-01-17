import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import AdminEmailSettings from "../components/ui/adminUI/Temail1";
import AddUserForm from "../components/ui/adminUI/email2";
import PFEEmailForm from "../components/ui/adminUI/email4";
import PFEReminderForm from "../components/ui/adminUI/email5";
import PFEEncadrementForm from "../components/ui/adminUI/email6";
import EncadrementInvitationForm from "../components/ui/adminUI/email7";
import NonSelectionNotificationForm from "../components/ui/adminUI/email8";
import PFEProposalForm from "../components/ui/adminUI/email9";
import PFEVALIDATION from "../components/ui/adminUI/email10";
import PFEEmailNotification from "../components/ui/adminUI/email11";
import PFEEmailNotification2 from "../components/ui/adminUI/email12";
import PFEEventNotification from "../components/ui/adminUI/email13";

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
          <Route path="emails" element={<Emails />}>
            <Route path="email1" element={<AdminEmailSettings />} />
            <Route path="email2" element={<PFEEmailForm />} />
            <Route path="email3" element={<AddUserForm />} />
            <Route path="email5" element={<PFEReminderForm />} />
            <Route path="email6" element={<PFEEncadrementForm />} />
            <Route path="email7" element={<EncadrementInvitationForm />} />
            <Route path="email8" element={<NonSelectionNotificationForm />} />
            <Route path="email9" element={<PFEProposalForm />} />
            <Route path="email10" element={<PFEVALIDATION />} />
            <Route path="email11" element={<PFEEmailNotification />} />
            <Route path="email12" element={<PFEEmailNotification2 />} />
            <Route path="email13" element={<PFEEventNotification />} />
          </Route>
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wishList" element={<WishList />} />
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
