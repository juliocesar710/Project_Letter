import styled from 'styled-components';
import FriendCard from './FriendCard';
import { useTranslation } from 'react-i18next';
import {useFriends} from '../../Hooks/Friend/useFriends';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px;
`;
const FriendsList = () => {
  const { t } = useTranslation();
  const { friends, loading, removeFriend } = useFriends();

  if (loading) {
    return <EmptyMessage>{t("loadingfriends")}</EmptyMessage>;
  }

  return (
    <ListContainer>
      <SectionTitle>
        {t("myfriends")} ({friends.length})
      </SectionTitle>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard
            key={friend.friend.id}
            friend={{
              name: friend.friend.name || "Usuário",
              profileImage: friend.friend.profileImage,
              status: friend.status || "Online",
              email: friend.friend.email || "email@gmail.com",
              id: friend.friend.id || "0",
              friendshipId: friend.id,
            }}
            onFriendRemoved={removeFriend}
          />
        ))
      ) : (
        <EmptyMessage>{t("nofriends")}</EmptyMessage>
      )}
    </ListContainer>
  );
};

export default FriendsList;