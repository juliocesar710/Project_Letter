import { useCallback, useState } from "react";
import { getUsersFromPost } from "../../api/Like/GetUsersFromPost";

export const usePostLikes = (postId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLikes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsersFromPost(postId);
      setUsers(data);
    } catch (err) {
      setError("Erro ao carregar curtidas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [postId]); 

  return { users, loading, error, fetchLikes };
};
