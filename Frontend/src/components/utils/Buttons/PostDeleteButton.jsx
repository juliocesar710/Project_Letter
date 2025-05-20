import Confirm from "../Alerts/Confirm";
import { useTranslation } from "react-i18next";
import { useDeletePost } from "../../../Hooks/utils/useDeletePost";
import { Trash } from "lucide-react";
import { DeleteButton } from "../../../styles/SharedComponents";

const DeletePostButton = ({ postId, onDeleted }) => {
  const { t } = useTranslation();
  const { showConfirm, openConfirm, closeConfirm, handleConfirm } =
    useDeletePost(postId, onDeleted);

  return (
    <>
      <DeleteButton onClick={openConfirm}>
        <Trash></Trash>
      </DeleteButton>
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
