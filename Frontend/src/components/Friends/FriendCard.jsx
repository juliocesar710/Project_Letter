import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const FriendInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 1.1rem;
`;

const Status = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 5px 0 0;
  font-size: 0.9rem;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${friend.id}`);
  };

  return (
    <Card onClick={handleViewProfile}>
      <ProfileImage src={friend.profileImage} alt={friend.name} />
      <FriendInfo>
        <Name>{friend.name}</Name>
        <Status>{friend.status || 'Online'}</Status>
      </FriendInfo>
      <ActionButton onClick={(e) => {
        e.stopPropagation();
        // Implementar ação de remover amigo
      }}>
        Remover
      </ActionButton>
    </Card>
  );
};

export default FriendCard; 