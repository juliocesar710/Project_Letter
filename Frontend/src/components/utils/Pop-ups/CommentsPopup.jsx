import styled from "styled-components";
import ReactDOM from "react-dom";
import { usePostCommentForm } from "../../../Hooks/Comment/usePostComments";
import { useDeleteComment } from "../../../Hooks/Comment/useDeleteComments";
import Cookies from "js-cookie";
import { Trash } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Popup = styled.div`
  background: ${({ theme }) => theme.colors.inputBackground};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 32px 24px;
  max-width: 480px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.light};
  position: relative;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    max-width: 90vw;
    padding: 24px 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  line-height: 1;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h3`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.padding.input};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.padding.input};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const CommentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.errorDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.border};
`;

const CommentContent = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.text};

  strong {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const CommentsPopup = ({
  open,
  onClose,
  comments,
  loading,
  fetchComments,
  postId,
}) => {
  const {
    content,
    setContent,
    loading: sending,
    error,
    handleSubmit,
  } = usePostCommentForm(postId, fetchComments);

  const { loading: deleting, handleDelete } = useDeleteComment(fetchComments);

  const userData = Cookies.get("userData");
  const currentUserId = userData ? JSON.parse(userData).id : null;

  if (!open) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Comentários</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva um comentário..."
            disabled={sending}
          />
          <SubmitButton type="submit" disabled={sending || !content.trim()}>
            {sending ? "Enviando..." : "Enviar"}
          </SubmitButton>
        </Form>
        {error && <ErrorText>{error}</ErrorText>}
        {loading ? (
          <p>Carregando...</p>
        ) : comments.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          <CommentList>
            {comments.map((comment) => (
              <CommentItem key={comment.id}>
                <Avatar
                  src={comment.user?.profileImage || "default.png"}
                  alt={comment.user?.name || "Usuário"}
                />
                <CommentContent>
                  <strong>{comment.user?.name || "Usuário"}</strong>
                  {comment.content}
                </CommentContent>
                {comment.user?.id === currentUserId && (
                  <DeleteButton
                    disabled={deleting}
                    onClick={() => handleDelete(comment.id)}
                    title="Excluir comentário"
                  >
                    <Trash />
                  </DeleteButton>
                )}
              </CommentItem>
            ))}
          </CommentList>
        )}
      </Popup>
    </Overlay>,
    document.body
  );
};

export default CommentsPopup;
