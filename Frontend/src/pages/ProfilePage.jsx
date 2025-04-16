import React, { useState } from "react";
import styled from "styled-components";
import ProfileInfo from "../components/profile/ProfileInfo";
import PostList from "../components/profile/PostList";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { userDelete } from "../api/Auth/userDelete";
import Confirm from "../components/utils/Confirm"; // Importe o componente Confirm

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(90deg, #f5f2ed, #e0dcd5);
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
  color: #8c8579;

  &:hover {
    color: #a39e93;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #e0dcd5;
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
    background-color: #f5f2ed;
  }
`;

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false); // Estado para exibir o Confirm
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    navigate("/auth");
  };

  const handleDeleteAccount = () => {
    setConfirmDelete(true); // Exibe o popup de confirmação
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
    bio: "Desenvolvedor apaixonado por tecnologia e inovação.",
    birthDate: "27 de março de 1990",
    profileImage:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1",
    interests: ["Tecnologia", "Inovação", "React", "JavaScript"],
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

  return (
    <PageContainer>
      <SettingsIcon onClick={toggleMenu}>⚙️</SettingsIcon>
      <Menu isOpen={menuOpen}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleDeleteAccount}>Deletar Conta</MenuItem>
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