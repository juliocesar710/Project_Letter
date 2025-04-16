import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const PostCardContainer = styled.div`
  background-color: ${theme.colors.inputBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: ${theme.shadows.light};
`;

const PostTitle = styled.h3`
  font-size: 18px;
  color: ${theme.colors.primaryDark};
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
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
