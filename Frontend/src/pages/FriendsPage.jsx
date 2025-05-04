import React, { useState } from "react";
import styled from "styled-components";
import FriendsList from "../components/Friends/FriendsList";
import FriendSearch from "../components/Friends/FriendSearch";
import FriendRequests from "../components/Friends/FriendRequests";
import AllUsersList from "../components/Friends/AllUsersList";

const FriendsContainer = styled.div`
  padding: 20px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  overflow: auto;
`;

const FriendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
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
`;

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const [allUsers, setAllUsers] = useState([]);

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
            Amigos
          </TabButton>
          <TabButton
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          >
            Pendentes
          </TabButton>
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          >
            Usuários
          </TabButton>
        </TabsContainer>
        <FriendSearch />
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
