import { useEffect, useState } from "react";
import { getFriendProfile } from "../../api/Friends/friendsProfile";

export const useFriendProfile = (friendId) => {
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const data = await getFriendProfile(friendId);
        setFriend(data);
      } catch (err) {
        setError(err.error || "Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    if (friendId) {
      fetchFriendProfile();
    }
  }, [friendId]);

  return { friend, loading, error };
};
