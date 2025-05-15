import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  height: 40px;
  width: 40px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
    opacity: 1;
  }

  span {
    visibility: hidden;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: #fff;
    text-align: center;
    padding: 5px 8px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }
`;

const PostsButton = ({ icon, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/liked-posts");
  };

  return (
    <TooltipWrapper>
      <IconButton onClick={handleClick}>
        {icon}
      </IconButton>
      <span>{label}</span>
    </TooltipWrapper>
  );
};

export default PostsButton;
