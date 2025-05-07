import styled from "styled-components";
import FriendRemoveButton from "../utils/Buttons/RemoveFriendButton";
import AddFriendButton from "../utils/Buttons/AddFriendButton.jsx";
import { useTranslation } from "react-i18next";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text};
  padding: 15px;
  width: 300px;
  overflow: hidden;

  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
  const { t } = useTranslation();
  return (
    <>
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
        <p>
          {t("email")}: {user.email || "Desconhecido"}
        </p>

        {isFriend ? (
          <FriendRemoveButton
            friend={{ ...user, friendshipId }}
            onFriendRemoved={onRemove}
            label={t("removefriend")}
          />
        ) : (
          <AddFriendButton friendId={user.id} onSuccess={onAdd}>
            {t("addfriend")}
          </AddFriendButton>
        )}
      </Card>
    </>
  );
};
