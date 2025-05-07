import React, { useState } from "react";
import styled from "styled-components";
import { inviteFriend } from "../../../api/Friends/friendsInvite";

const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
    transform: translateY(-1px);
  }
`;

const AddFriendButton = ({ friendId, onSuccess, children }) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      await inviteFriend(friendId);
      if (onSuccess) onSuccess(friendId);
    } catch (err) {
      console.error("Erro ao adicionar amigo:", err);
    } finally {
      // Adiciona um delay de 1 segundo antes de desativar o loading
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <ActionButton onClick={handleAdd} disabled={loading}>
      {loading ? "..." : children}
    </ActionButton>
  );
};

export default AddFriendButton;