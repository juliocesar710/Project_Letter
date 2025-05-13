import styled from "styled-components";
import Confirm from "../Alerts/Confirm";
import { useTranslation } from "react-i18next";
import { useRemoveFriendship } from "../../../Hooks/utils/useRemoveFriendship";

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
const FriendRemoveButton = ({ friend, onFriendRemoved, label }) => {
  const { t } = useTranslation();
  const { showConfirm, openConfirm, closeConfirm, handleConfirmRemove } =
    useRemoveFriendship(friend.id, onFriendRemoved);

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    openConfirm();
  };

  return (
    <>
      <ActionButton onClick={handleRemoveClick}>{label}</ActionButton>

      {showConfirm && (
        <Confirm
          message={
            t("wantremovefriend") + ` ${friend.name || t("thisfriend")} ?`
          }
          onConfirm={handleConfirmRemove}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default FriendRemoveButton;
