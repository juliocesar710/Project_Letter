import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "../../i18n";
import { Edit, Users } from "lucide-react";


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
  const { t } = useTranslation();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  }

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
        <ProfileButton onClick={handleFriendsClick}>
          <Users />
        </ProfileButton>
      </ProfileHeader>

      <Section>
        <ProfileButton onClick={handleEditProfile}>
          <Edit />
        </ProfileButton>
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
