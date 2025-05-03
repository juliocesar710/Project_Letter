// components/User/UserCard.jsx
import styled from "styled-components";
import FriendRemoveButton from "../utils/RemoveFriendButton";
import AddFriendButton from "../utils/AddFriendButton";

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
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
    <Card>
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
  );
};
