// components/SearchResultCard.js
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: ${({ theme }) => theme.shadows.light};
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 10px;
`;

const PostDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
`;

const SearchResultCard = ({ post }) => {
const navigate = useNavigate();


  const handleClick = () => {
   navigate(`/post/${post.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <PostTitle>{post.title}</PostTitle>
      <PostDescription>{post.description}</PostDescription>
    </CardContainer>
  );
};

export default SearchResultCard;
