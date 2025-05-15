import { useCallback, useState, useEffect } from "react";
import { getPostsFromUser } from "../../api/Like/GetPostsFromUser.js";

export const useLikedPosts = (userId) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLikedPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPostsFromUser(userId);
      console.log("Liked posts:", data);
      setLikedPosts(data || []);
    } catch (err) {
      setError("Erro ao carregar posts curtidos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchLikedPosts();
  }, [fetchLikedPosts]);

  return { likedPosts, loading, error };
};
