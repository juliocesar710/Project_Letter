import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPosts } from "../../api/Post/GetAllPosts"; // Atualize o caminho se necessário
import styled from "styled-components";

const PostDetailContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 20px;
`;

const PostContent = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 15px;
`;

const PostDetailPage = () => {
  const { id } = useParams();
  console.log("ID do post:", id);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postData = await getAllPosts({ id });
        console.log("Post data:", postData, id);
        setPost(postData);
      } catch (err) {
        console.error("Erro ao carregar post:", err);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (!post) return <p>Carregando post...</p>;

  return (
    <PostDetailContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.description}</PostContent>

      <PostImage
        src={
          post.image ||
          "https://superkind.org/wp-content/uploads/2022/05/writeletter.png"
        }
        alt={post.title}
      />
      {/* Aqui você pode adicionar mais detalhes do post */}
    </PostDetailContainer>
  );
};

export default PostDetailPage;
