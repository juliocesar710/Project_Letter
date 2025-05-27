import styled from "styled-components";
import Cookies from "js-cookie";

import { useLikedPosts } from "../../Hooks/Like/useLikedPosts";
import PostCard from "../../components/Post/PostCard";
import { useTranslation } from "react-i18next";
import { FormTitle, ErrorMessage } from "../../styles/Shared/form";

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

  if (loading)
    return (
      <PageContainer>
        <FormTitle>{t("likedPosts")}</FormTitle>
        <LoadingMessage>{t("loading")}</LoadingMessage>
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <FormTitle>{t("likedPosts")}</FormTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );

  return (
    <PageContainer>
      <FormTitle>{t("likedPosts")}</FormTitle>

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
