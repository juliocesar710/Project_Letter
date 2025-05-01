import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import ProfileForm from "../components/Auth/ProfileForm";
import HomePage from "../pages/HomePage";
import FriendsPage from "../pages/FriendsPage";
import FriendProfile from "../pages/FriendProfile";

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
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/friends/:friendId" element={<FriendProfile />} />
    </Routes>
  );
};

export default AppRoutes;
