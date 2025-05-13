import styled from "styled-components";
import { useState } from "react";

import PostCard from "../Post/PostCard";

import { useTranslation } from "react-i18next";

import CreatePostButton from "../utils/Buttons/CreatePostButton";
import SortControls from "../utils/SortControls";

const PostsContainer = styled.div`
  flex: 2;
  max-width: 600px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background || "#f9f9f9"};
  display: flex;
  flex-direction: column;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text || "#666"};
  font-style: italic;
`;

const PostList = ({ posts }) => {
  const { t } = useTranslation();
  const [sortedPosts, setSortedPosts] = useState(posts);

  const sortAlphabetically = () => {
    const sorted = [...posts].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
    setSortedPosts(sorted);
  };

  const sortByDate = () => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedPosts(sorted);
  };

  return (
    <PostsContainer>
      <CreatePostButton />
      <SortControls
        onSortAlphabetically={sortAlphabetically}
        onSortByDate={sortByDate}
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