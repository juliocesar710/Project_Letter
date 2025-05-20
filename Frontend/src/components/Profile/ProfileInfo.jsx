import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Users, Book, BookHeart } from "lucide-react";
import {
  ProfileImage,
  ProfileImageContainer,
  ProfileButton,
} from "../../styles/SharedComponents";
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

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;

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

const ProfileButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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

  const handleLikedPostsClick = () => {
    navigate("/liked-posts");
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
        <ProfileImageContainer>
          <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
        </ProfileImageContainer>
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
        <ProfileButtons>
          <TooltipWrapper>
            <ProfileButton onClick={handleEditProfile}>
              <Edit />
            </ProfileButton>
            <span>{t("editProfile")}</span>
          </TooltipWrapper>
          <TooltipWrapper>
            <ProfileButton onClick={handleLikedPostsClick}>
              <BookHeart />
            </ProfileButton>
            <span>{t("likedPosts")}</span>
          </TooltipWrapper>
        </ProfileButtons>
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
