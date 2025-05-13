import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Users, Book } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "../../i18n";

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
  display: flex; /* Adiciona o Flexbox */
  align-items: center; /* Centraliza verticalmente */
  justify-content: center; /* Centraliza horizontalmente */
  padding: 10px; /* Ajuste o padding conforme necessário */
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

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  width: 100%;
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
    bottom: 125%; /* acima do botão */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }
`;

const ProfileInfo = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  const handleFeedClick = () => {
    navigate("/feed");
  };

  let formattedBirthDate = t("date of birth not provided");

  if (user.birthDate) {
    const parsedDate = new Date(user.birthDate);
    if (!isNaN(parsedDate)) {
      formattedBirthDate = format(parsedDate, "dd  MMMM  yyyy", {
        locale: getCurrentLocale(),
      });
    }
  }

  return (
    <InfoCard>
      <ProfileHeader>
        <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
        <TooltipWrapper>
          <ProfileButton onClick={handleFriendsClick}>
            <Users />
          </ProfileButton>
          <span>{t("friends")}</span>
        </TooltipWrapper>

        <TooltipWrapper>
          <ProfileButton onClick={handleFeedClick}>
            <Book />
          </ProfileButton>
          <span>{t("feed")}</span>
        </TooltipWrapper>
      </ProfileHeader>

      <Section>
        <TooltipWrapper>
          <ProfileButton onClick={handleEditProfile}>
            <Edit />
          </ProfileButton>
          <span>{t("edit profile")}</span>
        </TooltipWrapper>
        <SectionTitle>{t("personal information")}</SectionTitle>
        <SectionContent>
          {t("name")}: {user.name}
        </SectionContent>
        <SectionContent>
          {t("email")}: {user.email}
        </SectionContent>
        <SectionContent>
          {t("date of birth")}: {formattedBirthDate}
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>{t("biography")}</SectionTitle>
        <SectionContent>{user.bio}</SectionContent>
      </Section>
      <Section>
        <SectionTitle>{t("interests")}</SectionTitle>
        <SectionContent>
          {user.interests && user.interests.length > 0
            ? user.interests.join(", ")
            : t("no interest registered.")}
        </SectionContent>
      </Section>
    </InfoCard>
  );
};

export default ProfileInfo;
