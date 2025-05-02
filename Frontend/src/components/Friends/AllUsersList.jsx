import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userGetAll } from "../../api/Auth/userGetAll";
import { friendsGetUser } from "../../api/Friends/friendsGetUser";
import FriendRemoveButton from "../utils/RemoveFriendButton";
import { inviteFriend } from "../../api/Friends/friendsInvite";
import Cookies from "js-cookie";

const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const UserCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 200px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const Button = styled.button`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AllUsersList = ({ onAddFriend, onRemoveFriend }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState({});

  const userData = JSON.parse(Cookies.get("userData") || "{}");
  const userId = userData.id;
  console.log("id so user logado:", userId)

  const handleAddFriend = async (friendId) => {
    setIsLoading((prev) => ({ ...prev, [friendId]: true }));
    try {
      await inviteFriend(friendId);
      if (onAddFriend) {
        onAddFriend(friendId);
      }
      const myFriends = await friendsGetUser();
      setFriends(myFriends || []);
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [friendId]: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primeiro tenta buscar ambos simultaneamente
        const [allUsers, myFriends] = await Promise.all([
          userGetAll(),
          friendsGetUser(),
        ]);

        console.log("All Users:", allUsers);
        console.log("My Friends:", myFriends);

        setUsers(allUsers || []);
        setFriends(Array.isArray(myFriends) ? myFriends : []);
      } catch (error) {
        console.error("Erro ao carregar dados combinados:", error);

        // Se falhar, tenta buscar apenas os usuários
        try {
          const allUsers = await userGetAll();
          console.log("Fallback - All Users:", allUsers);
          setUsers(allUsers || []);
          setFriends([]); // Define amigos como array vazio
        } catch (fallbackError) {
          console.error("Erro ao carregar usuários (fallback):", fallbackError);
          setUsers([]);
          setFriends([]);
        }
      }
    };

    fetchData();
  }, []);

  const isFriend = (userId) => {
    return (
      Array.isArray(friends) &&
      friends.some((friend) => friend?.friend?.id === userId)
    );
  };

  const getFriendshipId = (userId) => {
    const friendObj = friends.find((friend) => friend.friend.id === userId);
    return friendObj ? friendObj.id : null;
  };

  return (
    <UserListContainer>
      {users.filter(user => user.id !== userId)
      .map((user) => (
        <UserCard key={user.id}>
          <Avatar
            src={
              user.profileImage ||
              "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"
            }
            alt={user.name}
            onError={(e) => {
              e.target.src = "data:image/svg+xml;base64,...";
            }}
          />
          <h4>{user.name}</h4>
          <p>Email: {user.email || "Desconhecido"}</p>
          {isFriend(user.id) ? (
            <FriendRemoveButton
              friend={{ ...user, friendshipId: getFriendshipId(user.id) }}
              onFriendRemoved={onRemoveFriend}
            />
          ) : (
            <Button
              onClick={() => handleAddFriend(user.id)}
              disabled={isLoading[user.id]}
            >
              {isLoading[user.id] ? "Enviando..." : "Adicionar Amigo"}
            </Button>
          )}
        </UserCard>
      ))}
    </UserListContainer>
  );
};

export default AllUsersList;
