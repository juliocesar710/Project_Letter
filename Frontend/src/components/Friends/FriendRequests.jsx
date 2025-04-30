import React from 'react';
import styled from 'styled-components';

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

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px;
`;

const FriendRequests = ({ requests, onAcceptRequest, onRejectRequest }) => {
  return (
    <RequestsContainer>
      <SectionTitle>Solicitações de Amizade</SectionTitle>
      {requests.length > 0 ? (
        requests.map((request) => (
          <RequestCard key={request.id}>
            <RequestInfo>
              <ProfileImage src={request.profileImage} alt={request.name} />
              <Name>{request.name}</Name>
            </RequestInfo>
            <ButtonGroup>
              <ActionButton 
                className="accept"
                onClick={() => onAcceptRequest(request.id)}
              >
                Aceitar
              </ActionButton>
              <ActionButton 
                className="reject"
                onClick={() => onRejectRequest(request.id)}
              >
                Rejeitar
              </ActionButton>
            </ButtonGroup>
          </RequestCard>
        ))
      ) : (
        <EmptyMessage>Nenhuma solicitação de amizade pendente.</EmptyMessage>
      )}
    </RequestsContainer>
  );
};

export default FriendRequests; 