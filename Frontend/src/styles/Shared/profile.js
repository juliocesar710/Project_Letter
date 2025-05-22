import styled from "styled-components";

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const ProfileImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.colors.primaryLight};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.border};
`;

