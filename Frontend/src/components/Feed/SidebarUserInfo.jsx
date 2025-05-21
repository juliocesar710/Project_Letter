import styled from "styled-components";
import { useProfile } from "../../Hooks/Profile/useProfile";
import { useTranslation } from "react-i18next";
import Confirm from "../utils/Alerts/Confirm";
import { useNavigate } from "react-router-dom";
import { Button } from "../../styles/Shared/buttons";

const Container = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const UserName = styled.h2`
  font-size: 1.2rem;
  margin: 0.5rem 0;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const GenreList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;

const GenreTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.onPrimary};
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
`;

const SidebarUserInfo = () => {
  const {
    user,
    handleLogout,
    confirmLogout,
    confirmLogoutAction,
    cancelLogout,
  } = useProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProfile = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  return (
    <Container>
      <ProfileImage
        src={user.profileImage}
        alt="Foto do usuário"
        onClick={handleProfile}
      />
      <UserName>{user.name}</UserName>
      <Bio>{user.bio}</Bio>
      <GenreList>
        {user.interests.map((genre, index) => (
          <GenreTag key={index}>#{genre}</GenreTag>
        ))}
      </GenreList>
      <Button onClick={handleLogout}>{t("logout")}</Button>

      {confirmLogout && (
        <Confirm
          isOpen={confirmLogout}
          onConfirm={confirmLogoutAction}
          onCancel={cancelLogout}
          title={t("confirmLogoutTitle")}
          message={t("confirmLogoutMessage")}
        />
      )}
    </Container>
  );
};

export default SidebarUserInfo;
