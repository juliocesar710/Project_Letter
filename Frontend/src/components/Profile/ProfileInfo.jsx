import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Users, Book, BookHeart } from "lucide-react";

import { BaseButton } from "../../styles/Shared/buttons";
import {
  ProfileImage,
  ProfileImageContainer,
} from "../../styles/Shared/profile";
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
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* quebra em várias linhas se necessário */
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-right: 5px;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
`;

const ProfileInfo = ({ user }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEditProfile = () => navigate("/edit-profile");
  const handleFriendsClick = () => navigate("/friends");
  const handleFeedClick = () => navigate("/feed");
  const handleLikedPostsClick = () => navigate("/liked-posts");

  let formattedBirthDate = t("date of birth not provided");
  if (user.birthDate) {
    const parsedDate = new Date(user.birthDate);
    if (!isNaN(parsedDate)) {
      formattedBirthDate = format(parsedDate, "dd MMMM yyyy", {
        locale: getCurrentLocale(),
      });
    }
  }

  return (
    <InfoCard>
      <ProfileImageContainer>
        <ProfileImage src={user.profileImage} alt={`${user.name} profile`} />
      </ProfileImageContainer>

      <ActionsContainer>
        <TooltipWrapper>
          <BaseButton
            hasFlex
            padding="10px"
            fontSize="14px"
            fontWeight="bold"
            height="40px"
            width="40px"
            withTransform
            onClick={handleFriendsClick}
          >
            <Users />
          </BaseButton>
          <span>{t("friends")}</span>
        </TooltipWrapper>

        <TooltipWrapper>
          <BaseButton
            hasFlex
            padding="10px"
            fontSize="14px"
            fontWeight="bold"
            height="40px"
            width="40px"
            withTransform
            onClick={handleFeedClick}
          >
            <Book />
          </BaseButton>
          <span>{t("feed")}</span>
        </TooltipWrapper>

        <TooltipWrapper>
          <BaseButton
            hasFlex
            padding="10px"
            fontSize="14px"
            fontWeight="bold"
            height="40px"
            width="40px"
            withTransform
            onClick={handleEditProfile}
          >
            <Edit />
          </BaseButton>
          <span>{t("editProfile")}</span>
        </TooltipWrapper>

        <TooltipWrapper>
          <BaseButton
            hasFlex
            padding="10px"
            fontSize="14px"
            fontWeight="bold"
            height="40px"
            width="40px"
            withTransform
            onClick={handleLikedPostsClick}
          >
            <BookHeart />
          </BaseButton>
          <span>{t("likedPosts")}</span>
        </TooltipWrapper>
      </ActionsContainer>

      <Section>
        <SectionTitle>{t("personal information")}</SectionTitle>

        <SectionContent>
          <Label>{t("name")}:</Label> <Value>{user.name}</Value>
        </SectionContent>

        <SectionContent>
          <Label>{t("email")}:</Label> <Value>{user.email}</Value>
        </SectionContent>

        <SectionContent>
          <Label>{t("date of birth")}:</Label>{" "}
          <Value>{formattedBirthDate}</Value>
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
