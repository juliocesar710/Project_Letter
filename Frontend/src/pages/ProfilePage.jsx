import React from "react";
import styled from "styled-components";
import ProfileInfo from "../components/profile/ProfileInfo";
import PostList from "../components/profile/PostList";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(90deg, #f5f2ed, #e0dcd5);
`;

const ProfileSection = styled.div`
  flex: 1;
  max-width: 20%;
  margin-right: 20px;
`;

const ProfilePage = () => {
  const user = {
    name: "Julio César",
    bio: "Desenvolvedor apaixonado por tecnologia e inovação.",
    birthDate: "27 de março de 1990",
    profileImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/d9/fa/1b/lost-valley.jpg?w=900&h=500&s=1",
    interests: ["Tecnologia", "Inovação", "React", "JavaScript"],
    posts: [
      { id: 1, title: "Meu primeiro post", content: "Este é o conteúdo do meu primeiro post!" },
      { id: 2, title: "Explorando React", content: "Hoje aprendi sobre styled-components e React Hooks." },
    ],
  };

  return (
    <PageContainer>
      <ProfileSection>
        <ProfileInfo user={user} />
      </ProfileSection>
      <PostList posts={user.posts} />
    </PageContainer>
  );
};

export default ProfilePage;