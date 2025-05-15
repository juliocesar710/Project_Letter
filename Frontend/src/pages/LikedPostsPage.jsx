import { useLikedPosts } from "../Hooks/Like/useLikedPosts";
import PostCard from "../components/Post/PostCard";
import styled from "styled-components";
import Cookies from "js-cookie";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const LikedPostsPage = () => {
  const userData = Cookies.get("userData");
  const userId = userData ? JSON.parse(userData).id : null;
  console.log(userId);
  const { likedPosts = [], loading, error } = useLikedPosts(userId);

  if (loading) return <p>Carregando posts curtidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PageContainer>
      <h1>Posts Curtidos</h1>
      {likedPosts.length === 0 ? (
        <p>Você ainda não curtiu nenhum post.</p>
      ) : (
        likedPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </PageContainer>
  );
};

export default LikedPostsPage;
