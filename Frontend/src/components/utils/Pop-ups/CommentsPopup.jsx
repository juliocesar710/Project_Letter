import styled from "styled-components";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import { useState } from "react";

import Confirm from "../Alerts/Confirm";
import { useTranslation } from "react-i18next";
import { Avatar } from "../../../styles/Shared/profile";
import {
  BaseButton,
  IconButton,
} from "../../../styles/Shared/buttons";
import { TextArea } from "../../../styles/Shared/inputs";
import { FormTitle } from "../../../styles/Shared/form";
import { usePostCommentForm } from "../../../Hooks/Comment/usePostComments";
import { useDeleteComment } from "../../../Hooks/Comment/useDeleteComments";
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

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
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
  const { t } = useTranslation();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const { loading: deleting, handleDelete } = useDeleteComment(fetchComments);

  const userData = Cookies.get("userData");
  const currentUserId = userData ? JSON.parse(userData).id : null;

  if (!open) return null;

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <IconButton
          position="absolute"
          top="1.5rem"
          right="1rem"
          size="2rem"
          onClick={onClose}
        >
          &times;
        </IconButton>
        <FormTitle>{t("comments")}</FormTitle>
        <Form onSubmit={handleSubmit}>
          <TextArea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva um comentário..."
            disabled={sending}
          />
          <BaseButton
          width="100%"
          type="submit" disabled={sending || !content.trim()}>
            {sending ? "Enviando..." : "Enviar"}
          </BaseButton>
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
                  <>
                    <BaseButton
                      bg="transparent"
                      color="error"
                      hasFlex
                      gap="4px"
                      padding="4px"
                      disabled={deleting}
                      onClick={() => setConfirmDeleteId(comment.id)}
                      title="Excluir comentário"
                    >
                      <Trash />
                    </BaseButton>
                    {confirmDeleteId === comment.id && (
                      <Confirm
                        message={
                          t("wantremovecomment") ||
                          "Deseja remover este comentário?"
                        }
                        onConfirm={async () => {
                          await handleDelete(comment.id);
                          setConfirmDeleteId(null);
                        }}
                        onCancel={() => setConfirmDeleteId(null)}
                      />
                    )}
                  </>
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
