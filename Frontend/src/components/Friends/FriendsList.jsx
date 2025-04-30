import React from 'react';
import styled from 'styled-components';
import FriendCard from './FriendCard';

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

const FriendsList = ({ friends }) => {
  return (
    <ListContainer>
      <SectionTitle>Meus Amigos</SectionTitle>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))
      ) : (
        <EmptyMessage>Você ainda não tem amigos adicionados.</EmptyMessage>
      )}
    </ListContainer>
  );
};

export default FriendsList; 