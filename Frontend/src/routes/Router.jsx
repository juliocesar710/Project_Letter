import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import ProfileForm from "../components/Auth/ProfileForm";
import HomePage from "../pages/HomePage";

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage toggleTheme={toggleTheme} />} />
        <Route path="/edit-profile" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;