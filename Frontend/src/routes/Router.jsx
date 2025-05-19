import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "../pages/Auth/AuthPage";

import ProfilePage from "../pages/Profile/ProfilePage";

import FriendsPage from "../pages/Friends/FriendsPage";

import ProfileForm from "../pages/ProfileForm.jsx";
import HomePage from "../pages/HomePage";
import PrivateRoute from "./PrivateRoute";
import FriendProfile from "../pages/FriendProfile";
import FeedPage from "../pages/FeedPage";
import CreatePostForm from "../pages/CreatePostForm.jsx.jsx";
import PostDetailPage from "../pages/PostDetailPage.jsx";
import LikedPostsPage from "../pages/LikedPostsPage.jsx";

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
