import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FriendCard from './FriendCard';
import { friendsGetUser } from '../../api/Friends/friendsGetUser';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px;
`;

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFriends = async () => {
    try {
      const response = await friendsGetUser();
      
      if (Array.isArray(response) && response.length > 0) {
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

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleFriendRemoved = (friendId) => {
    setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
  };
  

  if (loading) {
    return <EmptyMessage>Carregando amigos...</EmptyMessage>;
  }

  return (
    <ListContainer>
      <SectionTitle>Meus Amigos</SectionTitle>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard 
            key={friend.friend.id} 
            friend={{
              name: friend.friend.name || 'Usuário',
              profileImage: friend.friend.profileImage,
              status: friend.status || 'Online',
              email: friend.friend.email || 'email@gmail.com',
              id: friend.friend.id || '0',
              friendshipId: friend.id
            }}
            onFriendRemoved={handleFriendRemoved}
          />
        ))
      ) : (
        <EmptyMessage>Você ainda não tem amigos adicionados.</EmptyMessage>
      )}
    </ListContainer>
  );
};

export default FriendsList; 