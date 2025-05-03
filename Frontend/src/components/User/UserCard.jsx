// components/User/UserCard.jsx
import styled from "styled-components";
import FriendRemoveButton from "../utils/RemoveFriendButton";
import AddFriendButton from "../utils/AddFriendButton";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  width: 200px;
  overflow: hidden;

  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Frame = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: transform 0.2s ease;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  margin: 0 auto;
  margin-bottom: 10px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const UserCard = ({ user, isFriend, friendshipId, onAdd, onRemove }) => {
  return (
    <>
      <Card>
        <Frame>
          <Avatar
            src={
              user.profileImage ||
              "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
            }
            alt={user.name}
            onError={(e) => {
              e.target.src =
                "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg";
            }}
          />
          <h4>{user.name}</h4>
          <p>Email: {user.email || "Desconhecido"}</p>
        </Frame>

        {isFriend ? (
          <FriendRemoveButton
            friend={{ ...user, friendshipId }}
            onFriendRemoved={onRemove}
          />
        ) : (
          <AddFriendButton friendId={user.id} onSuccess={onAdd}>
            Adicionar Amigo
          </AddFriendButton>
        )}
      </Card>
    </>
  );
};
