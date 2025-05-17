import { useLikedPosts } from "../Hooks/Like/useLikedPosts";
import PostCard from "../components/Post/PostCard";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  padding: ${({ theme }) => theme.padding.container};
  max-width: 800px;
  margin: 0 auto;
  min-height: 80vh;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    padding: 1.5rem;
  }

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.title};
  margin-bottom: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    font-size: ${({ theme }) => theme.fontSize.large};
    margin-bottom: 1.5rem;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 2rem;
  font-style: italic;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    gap: 1rem;
  }
`;

const LikedPostsPage = () => {
  const { t } = useTranslation();
  const userData = Cookies.get("userData");
  const userId = userData ? JSON.parse(userData).id : null;
  const { likedPosts = [], loading, error } = useLikedPosts(userId);

  if (loading) return (
    <PageContainer>
      <PageTitle>{t("likedPosts")}</PageTitle>
      <LoadingMessage>{t("loading")}</LoadingMessage>
    </PageContainer>
  );

  if (error) return (
    <PageContainer>
      <PageTitle>{t("likedPosts")}</PageTitle>
      <ErrorMessage>{error}</ErrorMessage>
    </PageContainer>
  );

  return (
    <PageContainer>
      <PageTitle>{t("likedPosts")}</PageTitle>
      
      {likedPosts.length === 0 ? (
        <EmptyMessage>{t("noLikedPosts")}</EmptyMessage>
      ) : (
        <PostsGrid>
          {likedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostsGrid>
      )}
    </PageContainer>
  );
};

export default LikedPostsPage;