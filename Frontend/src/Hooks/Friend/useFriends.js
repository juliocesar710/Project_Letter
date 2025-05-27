import { useEffect, useState } from 'react';
import { friendsGetUser } from '../../api/Friends/friendsGetUser';

export const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFriends = async () => {
    try {
      const response = await friendsGetUser();
      if (Array.isArray(response)) {
        setFriends(response);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
      setFriends([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFriend = (friendId) => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId));
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return {
    friends,
    loading,
    removeFriend,
  };
};
