import React from "react";
import styled from "styled-components";
import PostCard from "./PostCard";

const PostsContainer = styled.div`
  flex: 2;
  max-width: 600px;
`;

const PostList = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </PostsContainer>
  );
};

export default PostList;