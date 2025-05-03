// hooks/useUsersAndFriends.js
import { useEffect, useState } from "react";
import { userGetAll } from "../api/Auth/userGetAll";
import { friendsGetUser } from "../api/Friends/friendsGetUser";
import Cookies from "js-cookie";

export function useUsersAndFriends() {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const userId = JSON.parse(Cookies.get("userData") || "{}")?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allUsers, myFriends] = await Promise.all([
          userGetAll(),
          friendsGetUser(),
        ]);
        setUsers(allUsers || []);
        setFriends(Array.isArray(myFriends) ? myFriends : []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        try {
          const allUsers = await userGetAll();
          setUsers(allUsers || []);
          setFriends([]);
        } catch (fallbackError) {
          console.error("Erro fallback:", fallbackError);
          setUsers([]);
          setFriends([]);
        }
      }
    };

    fetchData();
  }, []);

  const isFriend = (id) =>
    Array.isArray(friends) &&
    friends.some((friend) => friend?.friend?.id === id);

  const getFriendshipId = (id) =>
    friends.find((friend) => friend.friend.id === id)?.id ?? null;

  const refreshFriends = async () => {
    const updated = await friendsGetUser();
    setFriends(updated || []);
  };

  return { users, friends, userId, isFriend, getFriendshipId, refreshFriends };
}
