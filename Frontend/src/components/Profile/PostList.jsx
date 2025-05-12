import styled from "styled-components";
import PostCard from "../Post/PostCard";
import { useTranslation } from "react-i18next";
import CreatePostButton from "../utils/Buttons/CreatePostButton";

const PostsContainer = styled.div`
  
  flex: 2;
  max-width: 600px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border || "#ccc"};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background || "#f9f9f9"};
  display: flex;
  flex-direction: column;

  
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text || "#666"};
  font-style: italic;
`;

const PostList = ({ posts }) => {
  const { t } = useTranslation();

  console.log("posts",posts);
  return (
    <PostsContainer>
      <CreatePostButton />
      {posts.length === 0 ? (
        <EmptyMessage>{t("nopostsfound")}</EmptyMessage>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </PostsContainer>
  );
};

export default PostList;
