import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "../pages/Auth/AuthPage";

import ProfilePage from "../pages/Profile/ProfilePage";
import ProfileForm from "../pages/Profile/ProfileForm.jsx";

import FriendsPage from "../pages/Friends/FriendsPage";
import FriendProfile from "../pages/Friends/FriendProfile.jsx";

import CreatePostForm from "../pages/Post/CreatePostForm.jsx.jsx";
import LikedPostsPage from "../pages/Post/LikedPostsPage.jsx";
import PostDetailPage from "../pages/Post/PostDetailPage.jsx";

import FeedPage from "../pages/Feed/FeedPage.jsx";

import HomePage from "../pages/Home/HomePage.jsx";

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
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <FeedPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="create-post"
          element={
            <PrivateRoute>
              <CreatePostForm />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <PostDetailPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/liked-posts"
          element={
            <PrivateRoute>
              <LikedPostsPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
