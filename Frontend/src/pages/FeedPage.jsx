import { useState } from "react";
import styled from "styled-components";

import SidebarUserInfo from "../components/Feed/SidebarUserInfo";
import FriendsPosts from "../components/Feed/FriendsPosts";
import InterestPosts from "../components/Feed/InterestPosts";
import AllPosts from "../components/Feed/AllPosts";
import SearchBar from "../components/Post/SearchBar";
import SearchResultCard from "../components/Post/SearchResultCard";
import { useTranslation } from "react-i18next";
import { useSearchPosts } from "../Hooks/useSearchPosts";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const SideBarLeft = styled.aside`
  width: 20%;
  min-width: 250px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    min-width: auto;
  }
`;

const MainContent = styled.main`
  width: 60%;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 100%;
    order: 3;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.surface};
  color: ${({ active, theme }) =>
    active ? theme.colors.onPrimary : theme.colors.text};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const SideBarRight = styled.aside`
  width: 20%;
  min-width: 250px;
  background-color: ${({ theme }) => theme.colors.surfaceDark};
  border-left: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 1024px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    min-width: auto;
    order: 2;
  }
`;

const SearchResultsContainer = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const FeedPage = () => {
  const [selectedTab, setSelectedTab] = useState("friends");
  const { results, loading, search, clearResults } = useSearchPosts();
  const { t } = useTranslation();

  const renderContent = () => {
    switch (selectedTab) {
      case "friends":
        return <FriendsPosts />;
      case "interests":
        return <InterestPosts />;
      case "all":
        return <AllPosts />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <SideBarLeft>
        <SidebarUserInfo />
      </SideBarLeft>

      <MainContent>
        <Tabs>
          <TabButton
            active={selectedTab === "friends"}
            onClick={() => setSelectedTab("friends")}
          >
            {t("friends")}
          </TabButton>
          <TabButton
            active={selectedTab === "interests"}
            onClick={() => setSelectedTab("interests")}
          >
            {t("interests")}
          </TabButton>
          <TabButton
            active={selectedTab === "all"}
            onClick={() => setSelectedTab("all")}
          >
            {t("all")}
          </TabButton>
        </Tabs>
        
        <SearchResultsContainer>
          <SearchBar onSearch={search}
           onClear={clearResults} />
          {loading ? (
            <p>{t("loading")}</p>
          ) : (
            results.map((post) => (
              <SearchResultCard key={post.id} post={post} />
            ))
          )}
        </SearchResultsContainer>

        {renderContent()}
      </MainContent>

      <SideBarRight>
        <h1>Em breve sugestões de livros e Rankings</h1>
      </SideBarRight>
    </Container>
  );
};

export default FeedPage;