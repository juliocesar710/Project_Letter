import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import styled from "styled-components";
import { useFriendProfile } from "../../Hooks/FriendProfile/useFriendProfile";
import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "../../i18n";
import { ProfileImage, ProfileImageContainer } from "../../styles/Shared/profile";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  background-image: ${({ theme }) =>
    theme.name === "dark"
      ? "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3))"
      : "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.3))"};
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large};
    transform: translateY(-5px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: ${({ theme }) =>
      theme.colors.primaryGradient || theme.colors.primary};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 3rem;
  position: relative;
`;
const ProfileInitial = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.colors.primaryGradient || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  text-align: center;
`;

const MemberSince = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.sectionBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin-left: 0.5rem;
  }
`;

const SectionContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`;

const GenreTag = styled.span`
  background: ${({ theme }) =>
    theme.colors.primaryGradient || theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.2rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${({ theme }) => theme.colors.error};
`;

const ErrorButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const FriendProfile = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { friend, loading, error } = useFriendProfile(friendId);

  if (loading) {
    return <LoadingContainer>{t("loading")}</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <ErrorButton onClick={() => navigate(-1)}>{t("back")}</ErrorButton>
      </ErrorContainer>
    );
  }

  return (
    <PageContainer>
      <ProfileCard>
        <BackButton onClick={() => navigate(-1)}>
          <span>←</span> {t("back")}
        </BackButton>

        <ProfileHeader>
          {friend.profileImage ? (
            <ProfileImageContainer>
              <ProfileImage src={friend.profileImage} alt={friend.name} />
            </ProfileImageContainer>
          ) : (
            <ProfileInitial>
              {friend.name.charAt(0).toUpperCase()}
            </ProfileInitial>
          )}
          <ProfileName>{friend.name}</ProfileName>
          <MemberSince>
            {t("member")}{" "}
            {format(new Date(friend.createdAt), "PPP", {
              locale: getCurrentLocale(),
            })}
          </MemberSince>
        </ProfileHeader>

        {friend.description && (
          <Section>
            <SectionTitle>
              <span>📝</span> {t("about")}
            </SectionTitle>
            <SectionContent>{friend.description}</SectionContent>
          </Section>
        )}

        {friend.birthDate && (
          <Section>
            <SectionTitle>
              <span>🎂</span> {t("date of birth")}
            </SectionTitle>
            <SectionContent>
              {format(new Date(friend.birthDate), "PPP", {
                locale: getCurrentLocale(),
              })}
            </SectionContent>
          </Section>
        )}

        {friend.genres && friend.genres.length > 0 && (
          <Section>
            <SectionTitle>{t("favoritegenrestext")}</SectionTitle>
            <SectionContent>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {friend.genres.map((genre) => (
                  <GenreTag key={genre.id}>{genre.name}</GenreTag>
                ))}
              </div>
            </SectionContent>
          </Section>
        )}
      </ProfileCard>
    </PageContainer>
  );
};

export default FriendProfile;
