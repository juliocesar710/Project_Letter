import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import ProfileForm from "../components/Auth/ProfileForm";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = ({ toggleTheme }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage toggleTheme={toggleTheme} />
            </PrivateRoute>
          }
        />
        <Route path="/edit-profile" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
