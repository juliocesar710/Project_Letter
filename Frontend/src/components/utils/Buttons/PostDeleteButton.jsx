import Confirm from "../Alerts/Confirm";
import { useTranslation } from "react-i18next";
import { useDeletePost } from "../../../Hooks/utils/useDeletePost";
import { Trash } from "lucide-react";
import {  BaseButton } from "../../../styles/Shared/buttons";

const DeletePostButton = ({ postId, onDeleted }) => {
  const { t } = useTranslation();
  const { showConfirm, openConfirm, closeConfirm, handleConfirm } =
    useDeletePost(postId, onDeleted);

  return (
    <>
      <BaseButton
        bg="transparent"
        color="error"
        hasFlex
        gap="4px"
        padding="4px"
        onClick={openConfirm}
      >
        <Trash></Trash>
      </BaseButton>
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
