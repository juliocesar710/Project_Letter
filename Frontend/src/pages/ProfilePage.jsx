import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/profile/ProfileInfo";
import PostList from "../components/profile/PostList";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userDelete } from "../api/Auth/userDelete";
import { getUserGenresText } from "../api/GenreText/genreTextGet";
import Confirm from "../components/utils/Confirm";

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
`;

const ProfileSection = styled.div`
  flex: 1;
  max-width: 20%;
  margin-right: 20px;
`;

const SettingsIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userGenres, setUserGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserGenres = async () => {
      try {
        const genres = await getUserGenresText();
        setUserGenres(genres.map((genre) => genre.genreName));
      } catch (error) {
        console.error("Erro ao buscar gêneros textuais do usuário:", error);
      }
    };

    fetchUserGenres();
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    navigate("/auth");
  };

  const handleDeleteAccount = () => {
    setConfirmDelete(true);
  };

  const confirmDeleteAccount = () => {
    const userId = JSON.parse(Cookies.get("userData") || "{}").id;
    userDelete(userId)
      .then(() => {
        Cookies.remove("authToken");
        Cookies.remove("userData");
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Erro ao deletar conta:", error);
      })
      .finally(() => {
        setConfirmDelete(false);
      });
  };

  const cancelDeleteAccount = () => {
    setConfirmDelete(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

  const userData = JSON.parse(Cookies.get("userData") || "{}");

  const user = {
    name: userData.name || "Usuário",
    email: userData.email || "email@exemplo.com",
    bio: userData.description || "Sem biografia disponível.",
    birthDate: userData.birthDate || "Data de nascimento não informada.",
    profileImage:
      userData.profileImage ||
      "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    interests: userGenres,
    posts: [
      {
        id: 1,
        title: "Meu primeiro post",
        content: "Este é o conteúdo do meu primeiro post!",
      },
      {
        id: 2,
        title: "Explorando React",
        content: "Hoje aprendi sobre styled-components e React Hooks.",
      },
    ],
  };

  console.log("User data:", userData);

  return (
    <PageContainer>
      <SettingsIcon onClick={toggleMenu}>⚙️</SettingsIcon>
      <Menu isOpen={menuOpen}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleDeleteAccount}>Deletar Conta</MenuItem>
        <MenuItem onClick={toggleTheme}>Alternar Tema</MenuItem>
      </Menu>
      <ProfileSection>
        <ProfileInfo user={user} />
      </ProfileSection>
      <PostList posts={user.posts} />
      {confirmDelete && (
        <Confirm
          message="Tem certeza que deseja deletar sua conta?"
          onConfirm={confirmDeleteAccount}
          onCancel={cancelDeleteAccount}
        />
      )}
    </PageContainer>
  );
};

export default ProfilePage;