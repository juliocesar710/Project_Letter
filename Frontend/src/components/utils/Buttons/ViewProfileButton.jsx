import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";

const StyledButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const ViewProfileButton = ({ userId, label, icon = true }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/friends/${userId}`);
  };

  return (
    <StyledButton onClick={handleClick}>
      <EyeIcon></EyeIcon>
      {label}
      {icon && (
        <svg
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" />
        </svg>
      )}
    </StyledButton>
  );
};

export default ViewProfileButton;
