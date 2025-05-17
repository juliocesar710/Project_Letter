import { useState, useEffect, useCallback } from "react";
import { getComment } from "../../api/Comment/GetComment";

export const useGetComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getComment(postId);
      console.log("Comments fetched:", data);
      setComments(data);
    } catch (err) {
      setError("Erro ao carregar comentários.", err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId, fetchComments]);

  return { comments, loading, error, fetchComments };
};