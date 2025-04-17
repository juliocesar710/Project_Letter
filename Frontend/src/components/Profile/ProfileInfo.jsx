import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

const EditButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const UserName = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-top: 15px;
`;

const UserEmail = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 10px;
  font-weight: bold;
`;

const Bio = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 10px;
`;

const ProfileInfo = ({ user }) => {
  const navigate = useNavigate();

  return (
    <InfoCard>
      <ProfileHeader>
        <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
        <EditButton onClick={() => navigate("/edit-profile")}>Editar Perfil</EditButton>
      </ProfileHeader>
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
      <Bio>{user.bio}</Bio>
    </InfoCard>
  );
};

export default ProfileInfo;