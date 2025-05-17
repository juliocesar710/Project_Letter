import styled from "styled-components";

const LikeButtonContainer = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

const LikeIcon = styled.span`
  color: ${props => props.liked ? props.theme.colors.primary : props.theme.colors.textSecondary};
  font-size: 1.2rem;
`;

const LikeButton = ({ liked, likesCount, onToggle, disabled }) => {
  return (
    <LikeButtonContainer 
      onClick={onToggle} 
      disabled={disabled}
      aria-label={liked ? "Remover curtida" : "Curtir"}
    >
      <LikeIcon liked={liked}>
        {liked ? '♥' : '♡'}
      </LikeIcon>
      <span>{likesCount}</span>
    </LikeButtonContainer>
  );
};

export default LikeButton;