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
const GenreList = styled.div`
  margin-top: 10px;

  span {
    margin-right: 8px;
    font-size: 12px;
    color: #555;
    background-color: ${({ theme }) => theme.colors.tagBackground || "#f0f0f0"};
    padding: 5px 10px;
    border-radius: ${({ theme }) => theme.borderRadius.small || "5px"};
    display: inline-block;
  }
`;

const SearchResultCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  console.log("post: ", post);
  return (
    <CardContainer onClick={handleClick}>
      <PostTitle>{post.title}</PostTitle>
      <PostDescription>{post.description}</PostDescription>
      <GenreList>
        {post.genreTexts &&
          post.genreTexts.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
      </GenreList>
    </CardContainer>
  );
};

export default SearchResultCard;
