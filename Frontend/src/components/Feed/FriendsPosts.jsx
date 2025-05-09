import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/Post/GetAllPosts";
import { friendsGetUser } from "../../api/Friends/friendsGetUser";
import PostCard from "../Profile/PostCard";
import styled from "styled-components";
import { format } from "date-fns";
import { getCurrentLocale } from "../../i18n";
import Cookies from "js-cookie";

const FeedContainer = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PostContainer = styled.article`
  background: ${({ theme }) => theme.colors.background || "#ffffff"};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border || "#eee"};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AuthorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary || "#3498db"};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary || "#333"};
  margin-bottom: 0.25rem;
`;

const PostDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary || "#777"};
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${({ theme }) => theme.colors.backgroundLight || "#f9f9f9"};
  border-radius: 16px;
  margin-top: 2rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary || "#777"};
  margin-bottom: 1rem;
`;

const FriendsPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(Cookies.get("userData") || "{}");
  console.log(userData.id);
  console.log(userData);

useEffect(() => {
  const fetchData = async () => {
    try {
      const friends = await friendsGetUser(userData);
      const friendIds = friends.map((f) => f.friend.id);

      const allPosts = await getAllPosts();

      const filteredPosts = allPosts.filter((post) =>
        friendIds.includes(post.user.id) || post.user.id === userData.id //posto do user logado
      );

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userData]);

  if (loading) return <LoadingText>Carregando posts...</LoadingText>;

  return (
    <FeedContainer>
      {posts.length === 0 ? (
        <EmptyState>
          <EmptyStateText>Nenhum post encontrado.</EmptyStateText>
          <p>Seja o primeiro a compartilhar algo!</p>
        </EmptyState>
      ) : (
        posts.map((post) => (
          <PostContainer key={post.id}>
            <PostHeader>
              <AuthorAvatar src={post.user.profileImage} alt={post.user.name} />
              <AuthorInfo>
                <AuthorName>{post.user.name}</AuthorName>
                <PostDate>
                  {format(new Date(post.createdAt), "d 'de' MMMM 'de' yyyy", {
                    locale: getCurrentLocale(),
                  })}
                </PostDate>
              </AuthorInfo>
            </PostHeader>

            <PostCard post={post} />
          </PostContainer>
        ))
      )}
    </FeedContainer>
  );
};

export default FriendsPosts;
