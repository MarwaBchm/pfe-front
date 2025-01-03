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
import Register from "../pages/register";
import WishList from "../components/wishList";
import OptionsManagement from "../components/optionsManagement";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="usersManagement" element={<UsersManagement />} />
          <Route path="subjectsManagement" element={<SubjectsManagement />} />
          <Route path="emails" element={<Emails />} />
          <Route path="defenseSchedule" element={<DefenseSchedule />} />
          <Route path="deadlines" element={<Deadlines />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="optionsManagement" element={<OptionsManagement />} />



        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
