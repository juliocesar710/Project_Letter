import { useState } from "react";
import styled from "styled-components";

import ProfileInfo from "../../components/Profile/ProfileInfo";
import PostList from "../../components/Profile/PostList";

import LanguageSwitcher from "../../components/utils/Buttons/LanguageSwitcherButton";
import Confirm from "../../components/utils/Alerts/Confirm";
import Header from "../../components/utils/Layout/Header";

import { usePosts } from "../../Hooks/Post/usePosts";
import { useProfile } from "../../Hooks/Profile/useProfile";

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
  flex-wrap: wrap;

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
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-10px)"};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease-in-out;

  margin: 1rem;
  padding: 1rem;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: ${({ theme }) => theme.borderRadius.large};
  }
`;

const ProfilePage = ({  changeTheme }) => {
 const [menuOpen, setMenuOpen] = useState(false);
  const [moreThemesOpen, setMoreThemesOpen] = useState(false); // Novo estado
  const { t } = useTranslation();

  const { posts, loading, error } = usePosts();
  const {
    user,
    confirmDelete,
    confirmLogout,
    handleLogout,
    handleDeleteAccount,
    confirmDeleteAccount,
    cancelDeleteAccount,
    confirmLogoutAction,
    cancelLogout,
  } = useProfile();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (loading) return <p>{t("loading")}</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />

      <PageContainer>
        <SettingsIcon onClick={toggleMenu}>⚙️</SettingsIcon>

       <Menu isOpen={menuOpen}>
          <MenuItem onClick={handleLogout}>{t("logout")}</MenuItem>
          <MenuItem onClick={handleDeleteAccount}>
            {t("deleteAccount")}
          </MenuItem>
          <MenuItem onClick={() => changeTheme("light")}>Tema Claro</MenuItem>
          <MenuItem onClick={() => changeTheme("dark")}>Tema Escuro</MenuItem>
          <MenuItem onClick={() => setMoreThemesOpen((v) => !v)}>
            {moreThemesOpen ? "▲ Menos temas" : "▼ Mais temas"}
          </MenuItem>
          {moreThemesOpen && (
            <div style={{ marginLeft: 10 }}>
              <MenuItem onClick={() => changeTheme("green")}>Tema Verde</MenuItem>
              <MenuItem onClick={() => changeTheme("red")}>Tema Vermelho</MenuItem>
              <MenuItem onClick={() => changeTheme("purple")}>Tema Roxo</MenuItem>
              <MenuItem onClick={() => changeTheme("classic")}>Tema Clássico</MenuItem>
              <MenuItem onClick={() => changeTheme("blue")}>Tema Azul</MenuItem>
              <MenuItem onClick={() => changeTheme("pastel")}>Tema Pastel</MenuItem>
            </div>
          )}
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

        {confirmLogout && (
          <Confirm
            message={t("confirmLogout")}
            onConfirm={confirmLogoutAction}
            onCancel={cancelLogout}
          />
        )}
      </PageContainer>
    </>
  );
};

export default ProfilePage;
