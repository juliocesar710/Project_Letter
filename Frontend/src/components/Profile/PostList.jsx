import styled from "styled-components";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PostCard from "../Post/PostCard";
import CreatePostButton from "../utils/Buttons/CreatePostButton";
import SortControls from "../utils/SortControls";

const PostsContainer = styled.div`
  flex: 2;
  max-width: 600px;
  padding: ${({ theme }) => theme.padding.container};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    max-width: 100%;
    padding: 1rem;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
  margin: 2rem 0;
`;

const PostList = ({ posts }) => {
  const { t } = useTranslation();
  const [sortMethod, setSortMethod] = useState("date");


  const sortedPosts = useMemo(() => {
    const postsCopy = [...posts];
    
    if (sortMethod === "alphabetical") {
      return postsCopy.sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      );
    }
    
    return postsCopy.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [posts, sortMethod]);

  const handleSortAlphabetically = () => setSortMethod("alphabetical");
  const handleSortByDate = () => setSortMethod("date");

  return (
    <PostsContainer>
      <CreatePostButton children={t("createdPost") } />
      <SortControls
        onSortAlphabetically={handleSortAlphabetically}
        onSortByDate={handleSortByDate}
      />
      {sortedPosts.length === 0 ? (
        <EmptyMessage>{t("nopostsfound")}</EmptyMessage>
      ) : (
        sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </PostsContainer>
  );
};

export default PostList;