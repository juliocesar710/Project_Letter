import React from "react";
import styled from "styled-components";

const PostCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const PostTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostCard = ({ post }) => {
  return (
    <PostCardContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
    </PostCardContainer>
  );
};

export default PostCard;
