import styled from "styled-components";
import FriendRemoveButton from "../utils/RemoveFriendButton";
import ViewProfileButton from "../utils/ViewProfileButton";

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: ${({ theme }) => theme.colors.text};
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s ease;
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

const FriendCard = ({ friend, onFriendRemoved }) => {
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
          <ViewProfileButton userId={friend.id} />
          <FriendRemoveButton
            friend={friend}
            onFriendRemoved={onFriendRemoved}
          />
        </ButtonsContainer>
      </Card>
    </>
  );
};

export default FriendCard;
