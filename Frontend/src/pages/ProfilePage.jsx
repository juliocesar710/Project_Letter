import { useState } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/profile/ProfileInfo";
import PostList from "../components/profile/PostList";
import Confirm from "../components/utils/Confirm";
import { usePosts } from "../Hooks/usePosts";
import { useProfile } from "../Hooks/useProfile";
import  LanguageSwitcher  from "../components/utils/Buttons/LanguageSwitcherButton";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.border}
  );
  position: relative;
  flex-wrap: wrap; // Garante que elementos quebrem linha se necessário

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

const ProfileSection = styled.div`
  flex: 1;
  max-width: 20%;
  margin-right: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;


const SettingsIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  z-index: 10;


  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  margin:1rem;
  padding:1rem;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ProfilePage = ({ toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const { posts, loading, error } = usePosts();
  const {
    user,
    confirmDelete,
    handleLogout,
    handleDeleteAccount,
    confirmDeleteAccount,
    cancelDeleteAccount,
  } = useProfile();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <SettingsIcon onClick={toggleMenu}>⚙️</SettingsIcon>
      <Menu isOpen={menuOpen}>
        <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
        <MenuItem onClick={handleDeleteAccount}>{t("deleteAccount")}</MenuItem>
        <MenuItem onClick={toggleTheme}>{t("toggleTheme")}</MenuItem>
        <LanguageSwitcher />
      </Menu>
      <ProfileSection>
        <ProfileInfo user={user} />
      </ProfileSection>
      <PostList posts={posts} />
      {confirmDelete && (
        <Confirm
          message={t("confirmDeleteAccount")}
          onConfirm={confirmDeleteAccount}
          onCancel={cancelDeleteAccount}
        />
      )}
    </PageContainer>
  );
};

export default ProfilePage;
