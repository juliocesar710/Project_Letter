import styled from "styled-components";
import FriendRemoveButton from "../utils/Buttons/RemoveFriendButton";
import AddFriendButton from "../utils/Buttons/AddFriendButton.jsx";
import { useTranslation } from "react-i18next";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Name = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const GenresContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin: 8px 0;
`;

const GenreTag = styled.span`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryText};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 1rem;
`;

export const UserCard = ({ user, isFriend, friendshipId, onAdd, onRemove }) => {
  const { t } = useTranslation();

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
      
      <Name>{user.name}</Name>
      
      {user.genres?.length > 0 && (
        <GenresContainer>
          {user.genres.slice(0, 3).map((genre, idx) => (
            <GenreTag key={idx}>{genre}</GenreTag>
          ))}
          {user.genres.length > 3 && <GenreTag>+{user.genres.length - 3}</GenreTag>}
        </GenresContainer>
      )}
      
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
  );
};