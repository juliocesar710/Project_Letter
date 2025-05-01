import React from 'react';
import styled from 'styled-components';
import { friendsPending } from '../../api/Friends/friendsPending';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';  

const RequestsContainer = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const RequestCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RequestInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &.accept {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &.reject {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const StatusMessage = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px;
`;
const FriendRequests = ({ onAcceptRequest, onRejectRequest }) => {
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

  if (loading) return <EmptyMessage>Carregando solicitações...</EmptyMessage>;

  return (
    <RequestsContainer>
      <SectionTitle>Solicitações de Amizade</SectionTitle>
      {requests.length > 0 ? (
        requests.map((request) => {
          // Determina se o usuário atual é quem ENVIOU a solicitação
          const isSender = currentUserId && request.user.id === currentUserId;
          
          // Se for o sender, mostra info do receptor (friend)
          // Se for o receiver, mostra info do sender (user)
          const profileUser = isSender ? request.friend : request.user;

          return (
            <RequestCard key={request.id}>
              <RequestInfo>
                <ProfileImage src={profileUser.profileImage} alt={profileUser.name} />
                <Name>{profileUser.name}</Name>
              </RequestInfo>
              
              {isSender ? (
                <StatusMessage>Aguardando confirmação...</StatusMessage>
              ) : (
                <ButtonGroup>
                  <ActionButton 
                    className="accept"
                    onClick={() => onAcceptRequest(request.user.id)}  // Aceita o sender
                  >
                    Aceitar
                  </ActionButton>
                  <ActionButton 
                    className="reject"
                    onClick={() => onRejectRequest(request.user.id)}  // Rejeita o sender
                  >
                    Rejeitar
                  </ActionButton>
                </ButtonGroup>
              )}
            </RequestCard>
          );
        })
      ) : (
        <EmptyMessage>Nenhuma solicitação de amizade pendente.</EmptyMessage>
      )}
    </RequestsContainer>
  );
};

export default FriendRequests;