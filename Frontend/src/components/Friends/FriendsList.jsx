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

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await friendsGetUser();
        console.log("Dados recebidos:", response);
        
        // Verifica se response é um array e tem dados
        if (Array.isArray(response) && response.length > 0) {
          console.log("friends",response)
          console.log("Dados recebidos:", response);

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

    fetchFriends();
  }, []);

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
              id: friend.id,
              name: friend.friend.name || 'Usuário',
              profileImage: friend.friend.profileImage,
              status: friend.status || 'Online'
            }} 
          />
        ))
      ) : (
        <EmptyMessage>Você ainda não tem amigos adicionados.</EmptyMessage>
      )}
    </ListContainer>
  );
};

export default FriendsList; 