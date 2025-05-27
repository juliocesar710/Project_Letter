import { useNavigate } from "react-router-dom";
import {  BaseButton } from "../../../styles/Shared/buttons";

const CreatePostButton = ({ children = "Criar Post" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post");
  };

  return <BaseButton onClick={handleClick}>{children}</BaseButton>;
};

export default CreatePostButton;
