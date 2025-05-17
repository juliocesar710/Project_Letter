import { useState } from "react";
import { postComment } from "../../api/Comment/PostComment";

export const usePostCommentForm = (postId, onSuccess) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await postComment(postId, content);
      setContent("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Erro ao enviar comentário.", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    content,
    setContent,
    loading,
    error,
    handleSubmit,
  };
};