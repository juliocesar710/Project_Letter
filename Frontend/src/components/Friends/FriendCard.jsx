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
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const FriendInfo = styled.div`
  flex: 1;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 1.1rem;
`;

const Email = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 5px 0;
  font-size: 0.9rem;
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
      <ProfileImage 
        src={friend.profileImage || 'https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg'} 
        alt={friend.name || 'Usuário'} 
        onError={(e) => {
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2NjYyIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA4Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmE5LjkxIDkuOTEgMCAwIDEtOC4wNC00LjQyYzAuMDItMy4wMiAyLjQ5LTUuNDcgNS40OC01LjQ3IDIuOTkgMCA1LjQ2IDIuNDUgNS40OCA5LjQ3QTkuOTEgOS45MSAwIDAgMSAxMiAxN3oiLz48L3N2Zz4=';
        }}
      />
      <FriendInfo>
        <Name>{friend.name || 'Usuário'}</Name>
        <Email>{friend.email || 'email@gmail.com'}</Email>
        <Status>Pedido de amizade: {friend.status || 'Online'}</Status>
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