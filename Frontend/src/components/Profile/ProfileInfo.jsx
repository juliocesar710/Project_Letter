import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const InfoCard = styled.div`
  background-color: ${theme.colors.inputBackground};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: 20px;
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 20px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background-color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.small} 0 0 ${theme.borderRadius.small};
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${theme.colors.primary};
  margin-bottom: 15px;
`;

const UserName = styled.h2`
  font-size: 24px;
  color: ${theme.colors.primaryDark};
  margin-bottom: 10px;
  text-align: center;
`;

const Bio = styled.p`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  text-align: center;
`;

const InterestsContainer = styled.div`
  margin-top: 15px;
  text-align: center;
`;

const Interest = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primaryLight};
  color: ${theme.colors.primaryDark};
  font-size: 14px;
  padding: 5px 10px;
  border-radius: ${theme.borderRadius.small};
  margin: 5px;
  box-shadow: ${theme.shadows.light};
`;

const ProfileInfo = ({ user }) => {
  return (
    <InfoCard>
      <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
      <UserName>{user.name}</UserName>
      <Bio>{user.bio}</Bio>
      <InfoText>Data de nascimento: {user.birthDate}</InfoText>
      <InterestsContainer>
        {user.interests.map((interest, index) => (
          <Interest key={index}>{interest}</Interest>
        ))}
      </InterestsContainer>
    </InfoCard>
  );
};

export default ProfileInfo;