import { useState, useEffect } from "react";
import { getAllPostByUser } from "../api/Post/GetAllPostByUser";

export const usePosts = (userId = null) => { 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllPostByUser();
        setPosts(postsData);
      } catch (err) {
        setError("Erro ao carregar posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]); 

  return { posts, loading, error };
};