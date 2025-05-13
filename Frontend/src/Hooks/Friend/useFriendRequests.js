import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { friendsPending } from '../../api/Friends/friendsPending';
import { updateFriendshipStatus } from '../../api/Friends/friendsStatus';

export const useFriendRequests = (onUpdateRequests) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    }

    const fetchRequests = async () => {
      try {
        const data = await friendsPending();
        setRequests(data);
      } catch (error) {
        console.error("Erro ao carregar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (friendId, status) => {
    try {
      await updateFriendshipStatus({ friendId, status });
      const updatedRequests = await friendsPending();
      setRequests(updatedRequests);
      if (onUpdateRequests) onUpdateRequests();
    } catch (error) {
      console.error("Erro ao atualizar status de amizade:", error);
    }
  };

  return {
    requests,
    loading,
    currentUserId,
    handleStatusChange,
  };
};
