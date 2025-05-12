import React, { useState } from "react";
import styled from "styled-components";
import Confirm from "../Alerts/Confirm";
import { deletePost } from "../../../api/Post/DeletePost"; 
import { useTranslation } from "react-i18next";

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
  }
`;

const DeletePostButton = ({ postId, onDeleted }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const handleConfirm = async () => {
    try {
      await deletePost(postId);
      if (onDeleted) onDeleted(postId); 
    } catch (err) {
      console.error("Erro ao deletar post:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <>
      <DeleteButton onClick={() => setShowConfirm(true)}>
        {t("delete")}
      </DeleteButton>
      {showConfirm && (
        <Confirm
          message={t("wantremovepost")}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default DeletePostButton;
