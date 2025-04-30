import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primaryDark};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 25px;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.light};
`;

const Section = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const SectionContent = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

const ProfileButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileInfo = ({ user }) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  }

  let formattedBirthDate = "Data de nascimento não informada";

  if (user.birthDate) {
    const parsedDate = new Date(user.birthDate);
    if (!isNaN(parsedDate)) {
      formattedBirthDate = format(parsedDate, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    }
  }

  return (
    <InfoCard>
      <ProfileHeader>
        <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
        <ProfileButton onClick={handleFriendsClick}>Amigos</ProfileButton>
      </ProfileHeader>

      <Section>
        <ProfileButton onClick={handleEditProfile}>Editar Perfil</ProfileButton>
        <SectionTitle>Informações Pessoais</SectionTitle>
        <SectionContent>Nome: {user.name}</SectionContent>
        <SectionContent>Email: {user.email}</SectionContent>
        <SectionContent>
          Data de Nascimento: {formattedBirthDate}
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Biografia</SectionTitle>
        <SectionContent>{user.bio}</SectionContent>
      </Section>
      <Section>
        <SectionTitle>Interesses</SectionTitle>
        <SectionContent>
          {user.interests && user.interests.length > 0
            ? user.interests.join(", ")
            : "Nenhum interesse cadastrado."}
        </SectionContent>
      </Section>
    </InfoCard>
  );
};

export default ProfileInfo;
