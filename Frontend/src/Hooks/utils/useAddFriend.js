import { useState } from "react";
import { inviteFriend } from "../../api/Friends/friendsInvite";

export const useAddFriend = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const addFriend = async (friendId) => {
    setLoading(true);
    try {
      await inviteFriend(friendId);
      if (onSuccess) onSuccess(friendId);
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  };

  return { loading, addFriend };
};
