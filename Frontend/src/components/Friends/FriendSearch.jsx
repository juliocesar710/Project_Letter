import React, { useState } from "react";
import styled from "styled-components";
import { userGetByName } from "../../api/Auth/userGetByName";
import { useEffect } from "react";
import { friendsGetUser } from "../../api/Friends/friendsGetUser";
import AddFriendButton from "../utils/AddFriendButton";
import ViewProfileButton from "../utils/ViewProfileButton";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || "#0053a0"};
  }
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const ResultItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const ResultImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const ResultEmail = styled.span`
  color: ${({ theme }) => theme.colors.subtleText || "#888"};
  font-size: 0.85rem;
`;

const FriendSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendsGetUser();
        setFriends(data.map((f) => f.friend)); // certifique-se de que isso seja um array de usuários com id
      } catch (error) {
        console.error("Erro ao carregar amigos:", error);
      }
    };

    fetchFriends();
  }, []);

  const isFriend = (userId) => {
    const parsedFriends = JSON.parse(JSON.stringify(friends));
    return parsedFriends.some((friend) => friend.id === userId);
  };

  const handleViewProfile = (userId) => {
    // use o React Router ou outra lógica de navegação
    navigate(`/profile/${userId}`);
  };

  const handleSearch = async () => {
    if (searchTerm.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const users = await userGetByName(searchTerm.trim());
      setResults(users);
    } catch (error) {
      console.log(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Buscar amigos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>
        {loading ? "Buscando..." : "Buscar"}
      </SearchButton>
      {results.length > 0 && (
        <SearchResults>
          {results.map((user) => (
            <ResultItem key={user.id}>
              <ResultImage
                src={user.profileImage || "https://via.placeholder.com/30"}
                alt={user.name}
              />
              <ResultInfo>
                <ResultName>{user.name}</ResultName>
                <ResultEmail>{user.email}</ResultEmail>
                {isFriend(user.id) ? (
                  <ViewProfileButton
                    onClick={() => handleViewProfile(user.id)}
                  />
                ) : (
                  <AddFriendButton userId={user.id}>
                    Adiconar Amigo
                  </AddFriendButton>
                )}
              </ResultInfo>
            </ResultItem>
          ))}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default FriendSearch;
