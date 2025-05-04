import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import ProfileForm from "../components/Profile/ProfileForm";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import FriendsPage from "../pages/FriendsPage";
import FriendProfile from "../pages/FriendProfile";

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
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <ProfileForm isEdit={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <PrivateRoute>
              <FriendsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/friends/:friendId"
          element={
            <PrivateRoute>
              <FriendProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
