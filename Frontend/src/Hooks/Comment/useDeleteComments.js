import { useState } from "react";
import { deleteComment } from "../../api/Comment/DeleteComment";

export const useDeleteComment = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (commentId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteComment(commentId);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Erro ao deletar comentário.", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleDelete };
};