import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import ProfileForm from "../components/Auth/ProfileForm";
import HomePage from "../pages/HomePage";

const AppRoutes = ({ toggleTheme }) => {
  return (
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
  );
};

export default AppRoutes;