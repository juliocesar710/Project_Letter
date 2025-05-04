import React, { useState } from "react";
import styled from "styled-components";
import { deleteFriendship } from "../../../api/Friends/friendsDelete";
import Confirm from "../../utils/Confirm";

const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
    transform: translateY(-1px);
  }
`;

const FriendRemoveButton = ({ friend, onFriendRemoved }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmRemove = async () => {
    try {
      await deleteFriendship(friend.id);
      if (onFriendRemoved) {
        onFriendRemoved(friend.id);
      }
      window.location.reload(); 
    } catch (error) {
      console.error("Erro ao remover amigo:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  return (
    <>
      <ActionButton onClick={handleRemoveClick}>Remover</ActionButton>

      {showConfirm && (
        <Confirm
          message={`Deseja realmente remover ${friend.name || "este amigo"} ?`}
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default FriendRemoveButton;
