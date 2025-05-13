import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/Post/GetAllPosts";
import PostCard from "../Post/PostCard";
import styled from "styled-components";
import { format } from "date-fns";
import { getCurrentLocale } from "../../i18n";
import Cookies from "js-cookie";
import SortControls from "../utils/SortControls"; 

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary || "#3498db"};
  color: ${({ theme }) => theme.colors.onPrimary || "#fff"};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled || "#ccc"};
    cursor: not-allowed;
  }
`;

const InterestPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const userData = JSON.parse(Cookies.get("userData") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await getAllPosts();
        const interests = userData.genreTexts || [];

        const filteredPosts = allPosts.filter(post =>
          post.genreTexts?.some(postGenre =>
            interests.includes(postGenre.name)
          )
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Erro ao buscar posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData.genreTexts]);

  const sortAlphabetically = () => {
    const sorted = [...posts].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
    setPosts(sorted);
  };

  const sortByDate = () => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPosts(sorted);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <LoadingText>Carregando posts...</LoadingText>;

  return (
    <FeedContainer>
      {/* Adicione o SortControls aqui */}
      <SortControls
        onSortAlphabetically={sortAlphabetically}
        onSortByDate={sortByDate}
      />

      {currentPosts.length === 0 ? (
        <EmptyState>
          <EmptyStateText>Nenhum post encontrado.</EmptyStateText>
          <p>Seja o primeiro a compartilhar algo!</p>
        </EmptyState>
      ) : (
        currentPosts.map((post) => (
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

      <PaginationContainer>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Anterior
        </PaginationButton>
        <PaginationButton
          onClick={handleNextPage}
          disabled={indexOfLastPost >= posts.length}
        >
          Próximo
        </PaginationButton>
      </PaginationContainer>
    </FeedContainer>
  );
};

export default InterestPosts;