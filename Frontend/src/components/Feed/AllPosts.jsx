import styled from "styled-components";
import { format } from "date-fns";

import PostCard from "../Post/PostCard";
import { getCurrentLocale } from "../../i18n";
import SortControls from "../utils/SortControls";
import { usePostsFeed } from "../../Hooks/Post/usePostsFeed";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../styles/SharedComponents";

const FeedContainer = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PostContainer = styled.article`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  span:last-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  padding: 0.6rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-top: 2rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const AllPosts = () => {
  const {
    currentPosts,
    loading,
    handleNextPage,
    handlePreviousPage,
    sortAlphabetically,
    sortByDate,
    isFirstPage,
    isLastPage,
  } = usePostsFeed();
  const { t } = useTranslation();

  if (loading) return <LoadingText>Carregando posts...</LoadingText>;

  return (
    <FeedContainer>
      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={isFirstPage}>
          {t("previous")}
        </PaginationButton>
        <PaginationButton onClick={handleNextPage} disabled={isLastPage}>
          {t("next")}
        </PaginationButton>
      </PaginationContainer>

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
              <Avatar src={post.user.profileImage} alt={post.user.name} />
              <PostInfo>
                <span>{post.user.name}</span>
                <span>
                  {format(new Date(post.createdAt), "d 'de' MMMM 'de' yyyy", {
                    locale: getCurrentLocale(),
                  })}
                </span>
              </PostInfo>
            </PostHeader>
            <PostCard post={post} />
          </PostContainer>
        ))
      )}

      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={isFirstPage}>
          {t("previous")}
        </PaginationButton>
        <PaginationButton onClick={handleNextPage} disabled={isLastPage}>
          {t("next")}
        </PaginationButton>
      </PaginationContainer>
    </FeedContainer>
  );
};

export default AllPosts;
