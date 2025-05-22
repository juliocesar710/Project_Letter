import styled from "styled-components";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";

import { getCurrentLocale } from "../../i18n";
import { useTranslation } from "react-i18next";

import { usePostById } from "../../Hooks/Post/usePostById";

import { BackButton } from "../../styles/Shared/buttons";

const PostDetailContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 900px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const PostHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const PostDate = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h1`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const PostImageContainer = styled.div`
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  position: relative;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const PostContentWrapper = styled.div`
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const PostContent = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  white-space: pre-line;

  p {
    margin-bottom: 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: ${({ theme }) => theme.colors.error};
`;

const GenreList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
`;

const GenreItem = styled.li`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { post, loading, error } = usePostById(id, t);

  if (loading) {
    return <LoadingContainer>{t("loading")}...</LoadingContainer>;
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <BackButton onClick={() => navigate(-1)}>
          ← {t("backToPosts")}
        </BackButton>
      </ErrorContainer>
    );
  }

  if (!post) {
    return <ErrorContainer>{t("postNotFound")}</ErrorContainer>;
  }

  return (
    <PostDetailContainer>
      <BackButton onClick={() => navigate(-1)}>← {t("backToPosts")}</BackButton>

      <PostCard>
        <PostHeader>
          <PostDate>
            {format(new Date(post.createdAt), "PPPp", {
              locale: getCurrentLocale(),
            })}
          </PostDate>
          <PostTitle>{post.title}</PostTitle>

          {post.genreTexts && post.genreTexts.length > 0 && (
            <GenreList>
              {post.genreTexts.map((genre) => (
                <GenreItem key={genre.id}>{genre.name}</GenreItem>
              ))}
            </GenreList>
          )}
        </PostHeader>

        {post.image && (
          <PostImageContainer>
            <PostImage src={post.image} alt={post.title} loading="lazy" />
          </PostImageContainer>
        )}

        <PostContentWrapper>
          <PostContent>
            {post.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </PostContent>
        </PostContentWrapper>
      </PostCard>
    </PostDetailContainer>
  );
};

export default PostDetailPage;
