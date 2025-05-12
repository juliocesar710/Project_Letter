import { useState } from "react";
import styled from "styled-components";

import FriendsList from "../components/Friends/FriendsList";
import FriendSearch from "../components/Friends/FriendSearch";
import FriendRequests from "../components/Friends/FriendRequests";
import AllUsersList from "../components/Friends/AllUsersList";


import { useTranslation } from "react-i18next";

const FriendsContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto; // evita scroll desnecessário em mobile
  }
`;

const FriendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) => (active ? "#fff" : theme.colors.text)};
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.background};
  }

  @media (max-width: 480px) {
    flex: 1 1 auto;
    font-size: 0.9rem;
    padding: 8px 12px;
  }
`;

const FriendSearchWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { t } = useTranslation();

  const handleAcceptRequest = (requestId) => {
    const request = friendRequests.find((req) => req.id === requestId);
    if (request) {
      setFriends([
        ...friends,
        { ...request, status: "online", lastSeen: "Agora mesmo" },
      ]);
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
      setAllUsers(
        allUsers.map((user) =>
          user.id === requestId ? { ...user, isFriend: true } : user
        )
      );
    }
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
  };

  const handleAddFriend = (userId) => {
    setAllUsers(
      allUsers.map((user) =>
        user.id === userId ? { ...user, isFriend: true } : user
      )
    );
    setFriends([...friends, allUsers.find((user) => user.id === userId)]);
  };

  const handleRemoveFriend = (userId) => {
    setAllUsers(
      allUsers.map((user) =>
        user.id === userId ? { ...user, isFriend: false } : user
      )
    );
    setFriends(friends.filter((friend) => friend.id !== userId));
  };

  return (
    <FriendsContainer>
      <FriendsHeader>
        <TabsContainer>
          <TabButton
            active={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
          >
            {t("friends")}
            
          </TabButton>
          <TabButton
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          >
            {t("pending")}
          </TabButton>
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          >
            {t("user")}
          </TabButton>
        </TabsContainer>
        <FriendSearchWrapper>
          <FriendSearch />
        </FriendSearchWrapper>
      </FriendsHeader>

      {activeTab === "friends" && <FriendsList friends={friends} />}
      {activeTab === "pending" && (
        <FriendRequests
          requests={friendRequests}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      )}
      {activeTab === "users" && (
        <AllUsersList
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          showFriendStatus={true}
        />
      )}
    </FriendsContainer>
  );
};

export default FriendsPage;
