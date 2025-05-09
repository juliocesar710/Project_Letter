import React, { useState } from "react";
import styled from "styled-components";

const PostCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: transform 0.2s ease;
  width:100%;

  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const PostImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 15px;
  object-fit: cover;
`;

const GenreList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

const GenreItem = styled.li`
  background-color: ${({ theme }) => theme.colors.tagBackground || "#eee"};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 12px;
  font-weight: bold;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary || "#3498db"};
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  margin-top: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ExpandableText = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  if (text.length <= maxLength) {
    return <PostContent>{text}</PostContent>;
  }

  const truncatedText = text.substring(0, maxLength) + '...';

  return (
    <PostContent>
      {isExpanded ? text : truncatedText}
      <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Ler menos' : 'Ler mais'}
      </ReadMoreButton>
    </PostContent>
  );
};

const PostCard = ({ post }) => {
  const { title, description, image, genreTexts = [] } = post;

  return (
    <PostCardContainer>
      <PostTitle>{title}</PostTitle>
      
      <ExpandableText text={description} maxLength={100} />
      
      <PostImage
        src={image || "https://superkind.org/wp-content/uploads/2022/05/writeletter.png"}
        alt={title}
      />

      {genreTexts.length > 0 && (
        <GenreList>
          {genreTexts.map((genre) => (
            <GenreItem key={genre.id}>{genre.name}</GenreItem>
          ))}
        </GenreList>
      )}
    </PostCardContainer>
  );
};

export default PostCard;