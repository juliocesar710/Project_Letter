import { useNavigate } from "react-router-dom";
import { EyeIcon } from "lucide-react";
import { ViewFriendProfileButton } from "../../../styles/Shared/buttons";

const ViewProfileButton = ({ userId, label, icon = true }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/friends/${userId}`);
  };

  return (
    <ViewFriendProfileButton onClick={handleClick}>
      <EyeIcon></EyeIcon>
      {label}
      {icon && (
        <svg
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" />
        </svg>
      )}
    </ViewFriendProfileButton>
  );
};

export default ViewProfileButton;
