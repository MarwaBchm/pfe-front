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
import ProfilePage from "../components/profile";
import AdminEmailSettings from "../components/Temail1"; /*1*/
import AddUserForm from "../components/email3"; /*3*/
import PFEEmailForm from "../components/email4"; /*4*/
import PFEReminderForm from "../components/email5"; /*5*/
import PFEEncadrementForm from "../components/email6"; /*6*/
import EncadrementInvitationForm from "../components/email7"; /*7*/
import NonSelectionNotificationForm from "../components/email8"; /*8*/
import PFEProposalForm from "../components/email9"; /*9*/
import PFEVALIDATION from "../components/email10"; /*10*/
import PFEEmailNotification from "../components/email11";/*11*/ 
import PFEEmailNotification2 from "../components/email12"; /*12*/
import PFEEventNotification from "../components/email13"; /*13*/
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="usersManagement" element={<UsersManagement />} />
          <Route path="subjectsManagement" element={<SubjectsManagement />} />
          <Route path="emails" element={<Emails />}></Route>

          <Route path="defenseSchedule" element={<DefenseSchedule />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/email3" element={<AddUserForm />} />
        <Route path="/email1" element={<AdminEmailSettings />} />
        <Route path="/email2" element={<PFEEmailForm />} />
        <Route path="/email5" element={<PFEReminderForm />} />
        <Route path="/email6" element={<PFEEncadrementForm />} />
        <Route path="/email7" element={<EncadrementInvitationForm />} />
        <Route path="/email8" element={<NonSelectionNotificationForm />} />
        <Route path="/email9" element={<PFEProposalForm />} />
        <Route path="/email10" element={<PFEVALIDATION />} />
        <Route path="/email11" element={<PFEEmailNotification />} />
        <Route path="/email12" element={<PFEEmailNotification2 />} />
        <Route path="/email13" element={<PFEEventNotification />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
