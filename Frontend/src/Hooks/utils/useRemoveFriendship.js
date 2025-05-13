import { useState } from "react";
import { deleteFriendship } from "../../api/Friends/friendsDelete";

export const useRemoveFriendship = (friendId, onFriendRemoved, shouldReload = true) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmRemove = async () => {
    setLoading(true);
    try {
      await deleteFriendship(friendId);
      if (onFriendRemoved) {
        onFriendRemoved(friendId);
      }
      if (shouldReload) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao remover amizade:", error);
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
    handleConfirmRemove,
  };
};
