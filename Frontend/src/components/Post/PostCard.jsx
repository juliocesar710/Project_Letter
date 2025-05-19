import { useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { format } from "date-fns";

import PostDeleteButton from "../utils/Buttons/PostDeleteButton";
import LikeButton from "../utils/Buttons/LikeButton";

import LikesPopup from "../utils/Pop-ups/LikesPopup";
import CommentsPopup from "../utils/Pop-ups/CommentsPopup";

import { useLike } from "../../Hooks/Like/useLike";
import { usePostLikes } from "../../Hooks/Like/usePostLikes";
import { useGetComments } from "../../Hooks/Comment/useGetComments";

import { useTranslation } from "react-i18next";
import { getCurrentLocale } from "../../i18n";

const PostCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${({ theme }) => theme.shadows.light};
  transition: transform 0.2s ease;
  width: 100%;

  &:hover {
    transform: scale(1.02);
  }
`;

const PostTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const PostImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 15px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const GenreList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
`;

const GenreItem = styled.li`
  background-color: ${({ theme }) => theme.colors.tagBackground || "#eee"};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 12px;
  font-weight: bold;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary || "#3498db"};
  cursor: pointer;
  font-weight: 500;
  padding: 0;
  margin-top: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonDelete = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
margin-top: 10px;
margin-bottom: 10px;
margin-right: 10px;
width:100%;


}
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para nova linha */
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 0.5rem; /* Espaço entre os itens */
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os botões verticalmente em telas pequenas */
    align-items: stretch; /* Faz os botões ocuparem toda a largura */
  }
`;

const ViewLikesButton = styled.button`
  margin-top: 0;
  padding: 0.4rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex: 1; /* Permite que o botão cresça */
  min-width: 120px; /* Largura mínima */

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  margin-top: 0;
  padding: 0.4rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex: 1; 
  min-width: 120px; 

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const ExpandableText = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  if (!text) return null;

  if (text.length <= maxLength) {
    return <PostContent>{text}</PostContent>;
  }

  const truncatedText = text.substring(0, maxLength) + "...";

  return (
    <PostContent>
      {isExpanded ? text : truncatedText}
      <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? t("readmore") : t("readless")}
      </ReadMoreButton>
    </PostContent>
  );
};
const PostCard = ({ post, onDeleted }) => {
  const { title, description, image, genreTexts = [], id, userId } = post;
  const { likesCount, likedByUser } = post;
  const [showPopup, setShowPopup] = useState(false);
  const { users, loading, fetchLikes } = usePostLikes(post.id);
  const [showComments, setShowComments] = useState(false);
  const { comments } = useGetComments(post.id);
  const { t } = useTranslation();

  const {
    liked,
    likesCount: currentLikesCount,
    toggleLike,
    isLoading: likeLoading,
  } = useLike(likedByUser, likesCount, id);

  const userData = Cookies.get("userData");
  const loggedUserId = userData ? JSON.parse(userData).id : null;
  const isOwner = loggedUserId === userId;

  const handleShowPopup = () => {
    fetchLikes();
    setShowPopup(true);
  };

  return (
    <PostCardContainer>
      <PostContent>
        {" "}
        {format(new Date(post.createdAt), "dd/MM/yyyy 'às' HH:mm", {
          locale: getCurrentLocale(),
        })}
      </PostContent>
      {isOwner && (
        <ButtonDelete>
          <PostDeleteButton postId={id} onDeleted={onDeleted} />
        </ButtonDelete>
      )}

      <PostTitle>{title}</PostTitle>

      <ExpandableText text={description} maxLength={100} />

      <PostImage
        src={
          image ||
          "https://superkind.org/wp-content/uploads/2022/05/writeletter.png"
        }
        alt={title}
      />

      {genreTexts.length > 0 && (
        <GenreList>
          {genreTexts.map((genre) => (
            <GenreItem key={genre.id}>{genre.name}</GenreItem>
          ))}
        </GenreList>
      )}
      <LikeButton
        liked={liked}
        likesCount={currentLikesCount}
        onToggle={toggleLike}
        disabled={likeLoading}
      />
      <ContainerButtons>
        <ViewLikesButton onClick={handleShowPopup}>
          {t("viewLikes")}
        </ViewLikesButton>
        {showPopup && (
          <LikesPopup
            postId={post.id}
            onClose={() => setShowPopup(false)}
            fetchLikes={fetchLikes}
            users={users}
            loading={loading}
          />
        )}
        <Button onClick={() => setShowComments(true)}>
          {t("viewComments")}
        </Button>
        <CommentsPopup
          open={showComments}
          onClose={() => setShowComments(false)}
          comments={comments}
          loading={loading}
          postId={id}
        />
      </ContainerButtons>
    </PostCardContainer>
  );
};

export default PostCard;
