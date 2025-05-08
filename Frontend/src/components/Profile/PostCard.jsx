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

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  object-fit: cover;
  margin-bottom: 10px;
`;

const PostCard = ({ post }) => {
  return (
    <PostCardContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.description}</PostContent>
      <PostImage src={post.image || "https://superkind.org/wp-content/uploads/2022/05/writeletter.png"}></PostImage>
    </PostCardContainer>
  );
};

export default PostCard;
