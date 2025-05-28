import styled from "styled-components";
import Cookies from "js-cookie";

import AddFriendButton from "../utils/Buttons/AddFriendButton";
import ViewProfileButton from "../utils/Buttons/ViewProfileButton";

import { useTranslation } from "react-i18next";

import { useFriendSearch } from "../../Hooks/Friend/useFriendSearch";
import { Input } from "../../styles/Shared/inputs";

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
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

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputSearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

const FriendSearch = () => {
  const { t } = useTranslation();

  const userId = JSON.parse(Cookies.get("userData") || "{}")?.id;
  const {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    handleSearch,
    isFriend,
    refreshFriends,
    setResults,
  } = useFriendSearch(userId);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <SearchContainer>
      <InputSearchContainer>
        <Input
          type="text"
          placeholder={t("searchfriends")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />{" "}
        {searchTerm && (
          <ClearButton onClick={clearSearch} aria-label={t("clearsearch")}>
            &times;
          </ClearButton>
        )}
      </InputSearchContainer>

      <SearchButton onClick={handleSearch}>
        {loading ? t("search") : t("searching")}
      </SearchButton>
      {results.length > 0 && (
        <SearchResults>
          {results
            .filter((u) => u.id !== userId)
            .map((user) => (
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
                      userId={user.id}
                      label={t("viewprofile")}
                    />
                  ) : (
                    <AddFriendButton
                      friendId={user.id}
                      onSuccess={() => {
                        refreshFriends();
                        setResults((prev) =>
                          prev.filter((u) => u.id !== user.id)
                        );
                      }}
                    >
                      {t("addfriend")}
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
