import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userGetAll } from "../../api/Auth/userGetAll";
import { friendsGetUser } from "../../api/Friends/friendsGetUser";
import FriendRemoveButton from "../utils/RemoveFriendButton";
import AddFriendButton from "../utils/AddFriendButton";
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



const AllUsersList = ({ onAddFriend, onRemoveFriend }) => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const userData = JSON.parse(Cookies.get("userData") || "{}");
  const userId = userData.id;
  console.log("id so user logado:", userId);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        try {
          const allUsers = await userGetAll();
          console.log("Fallback - All Users:", allUsers);
          setUsers(allUsers || []);
          setFriends([]);
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
      {users
        .filter((user) => user.id !== userId)
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
              <AddFriendButton
                friendId={user.id}
                onSuccess={async () => {
                  if (onAddFriend) onAddFriend(user.id);
                  const updatedFriends = await friendsGetUser();
                  setFriends(updatedFriends || []);
                }}
              >
                Adicionar Amigo
              </AddFriendButton>
            )}
          </UserCard>
        ))}
    </UserListContainer>
  );
};

export default AllUsersList;
