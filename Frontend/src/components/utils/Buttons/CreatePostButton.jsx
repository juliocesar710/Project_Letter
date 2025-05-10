import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ActionButton = styled.button`
    
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  padding: 1rem;
  margin: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const CreatePostButton = ({ children = "Criar Post" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post");
  };

  return <ActionButton onClick={handleClick}>{children}</ActionButton>;
};

export default CreatePostButton;
