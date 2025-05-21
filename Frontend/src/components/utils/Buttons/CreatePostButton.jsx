import { useNavigate } from "react-router-dom";
import { Button } from "../../../styles/Shared/buttons";

const CreatePostButton = ({ children = "Criar Post" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-post");
  };

  return <Button onClick={handleClick}>{children}</Button>;
};

export default CreatePostButton;
