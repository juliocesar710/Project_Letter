import styled from "styled-components";
import Confirm from "../Alerts/Confirm";
import { useTranslation } from "react-i18next";
import { useDeletePost } from "../../../Hooks/utils/useDeletePost";

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
  const { t } = useTranslation();
  const { showConfirm, openConfirm, closeConfirm, handleConfirm } =
    useDeletePost(postId, onDeleted);

  return (
    <>
      <DeleteButton onClick={openConfirm}>{t("delete")}</DeleteButton>
      {showConfirm && (
        <Confirm
          message={t("wantremovepost")}
          onConfirm={handleConfirm}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default DeletePostButton;
