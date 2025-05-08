// hooks/useFriendSearch.js
import { useEffect, useState } from "react";
import { friendsGetUser } from "../api/Friends/friendsGetUser";
import { userGetByName } from "../api/Auth/userGetByName";

export const useFriendSearch = (currentUserId) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setTimeout(() => {}, 1000);
        const data = await friendsGetUser();
        setFriends(data.map((f) => f.friend));
      } catch (error) {
        console.error("Erro ao carregar amigos:", error);
      }
    };
    fetchFriends();
  }, [currentUserId]);

  const isFriend = (userId) => {
    return friends.some((f) => f.id === userId);
  };

  const refreshFriends = async () => {
    const updated = await friendsGetUser();
    setFriends(updated.map((f) => f.friend));
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length < 3) {
      setResults([]);
      return;
    }

    try {
      setLoading(false);
      setTimeout(async () => {
        const users = await userGetByName(searchTerm.trim());
        setLoading(true);
        setResults(users);
      }, 1000);
    } catch (error) {
      console.log(error);
      setResults([]);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    handleSearch,
    isFriend,
    refreshFriends,
    setResults,
  };
};
