import { useState } from "react";
import { deletePost } from "../../api/Post/DeletePost";

export const useDeletePost = (postId, onDeleted) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await deletePost(postId);
      if (onDeleted) onDeleted(postId);
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    } finally {
      setLoading(false);
      closeConfirm();
    }
  };

  return {
    showConfirm,
    loading,
    openConfirm,
    closeConfirm,
    handleConfirm,
  };
};
