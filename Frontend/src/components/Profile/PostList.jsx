import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";

const PostsContainer = styled.div`
  flex: 2;
  max-width: 600px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background || "#f9f9f9"};
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text || "#666"};
  font-style: italic;
`;

const PostList = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.length === 0 ? (
        <EmptyMessage>Nenhum post encontrado.</EmptyMessage>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </PostsContainer>
  );
};

export default PostList;
