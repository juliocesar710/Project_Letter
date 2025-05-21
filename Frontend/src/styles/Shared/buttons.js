import styled from "styled-components";

export const Button = styled.button`
  width: ${({ width }) => width || "100%"};
  padding: ${({ theme }) => theme.padding.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1rem;

  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inputBackground};
  background-color: ${({ confirm, theme }) =>
    confirm ? theme.colors.primaryDark : theme.colors.error};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    opacity: 0.9;
  }
`;
export const LanguageButton = styled.button`
  padding: ${({ theme }) => theme.padding.button};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  margin: 1rem 0.5rem 0.5rem 0;
  transition: all 0.2s ease;
  

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: default;
    transform: none;
  }
`;
export const ViewFriendProfileButton = styled.button`
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
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;