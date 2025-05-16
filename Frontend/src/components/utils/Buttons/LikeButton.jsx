import styled from "styled-components";
import { Heart, CalendarHeart } from "lucide-react"; 

const LikeButtonStyled = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ liked, theme }) => (liked ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const LikeButton = ({ liked, likesCount, onToggle }) => {
  return (
    <LikeButtonStyled liked={liked} onClick={onToggle}>
      {liked ? <CalendarHeart size={20} /> : <Heart size={20} />}
      <span>{likesCount}</span>
    </LikeButtonStyled>
  );
};

export default LikeButton;