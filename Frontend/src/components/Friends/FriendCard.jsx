import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { deleteFriendship } from "../../api/Friends/friendsDelete";
import Confirm from "../utils/Confirm";
import FriendRemoveButton from "../utils/RemoveFriendButton";



const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;

  
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

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
    transform: translateY(-1px);
  }
`;

const ViewProfileButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const FriendCard = ({ friend, onFriendRemoved }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleViewProfile = (e) => {
    e.stopPropagation();
    navigate(`/friends/${friend.id}`);
  };

  const handleConfirmRemove = async () => {
    try {
      await deleteFriendship(friend.id);
      if (onFriendRemoved) {
        onFriendRemoved(friend.id);
      }
      window.location.reload();

    } catch (error) {
      console.error("Erro ao remover amigo:", error);
    } finally {
      setShowConfirm(false);
    }
  };



  return (
    <>
      <Card>
        <ProfileImage
          src={
            friend.profileImage ||
            "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
          }
          alt={friend.name || "Usuário"}
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2NjYyIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA4Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmE5LjkxIDkuOTEgMCAwIDEtOC4wNC00LjQyYzAuMDItMy4wMiAyLjQ5LTUuNDcgNS40OC01LjQ3IDIuOTkgMCA1LjQ2IDIuNDUgNS40OCA5LjQ3QTkuOTEgOS45MSAwIDAgMSAxMiAxN3oiLz48L3N2Zz4=";
          }}
        />
        <FriendInfo>
          <Name>{friend.name || "Usuário"}</Name>
          <Email>{friend.email || "email@gmail.com"}</Email>
          <Status>Pedido de amizade: {friend.status || "Online"}</Status>
        </FriendInfo>
        <ButtonsContainer>
          <ViewProfileButton onClick={handleViewProfile}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10Z"
                fill="currentColor"
              />
            </svg>
            Ver Perfil
          </ViewProfileButton>
          <FriendRemoveButton friend={friend} onFriendRemoved={onFriendRemoved} />
          </ButtonsContainer>
      </Card>

      {showConfirm && (
        <Confirm
          message={`Deseja realmente remover ${friend.name || "este amigo"}?`}
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default FriendCard;
