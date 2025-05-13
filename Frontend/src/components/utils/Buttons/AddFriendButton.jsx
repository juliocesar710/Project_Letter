import styled from "styled-components";
import { useAddFriend } from "../../../Hooks/utils/useAddFriend";

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
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;
const AddFriendButton = ({ friendId, onSuccess, children }) => {
  const { loading, addFriend } = useAddFriend(onSuccess);

  return (
    <ActionButton onClick={() => addFriend(friendId)} disabled={loading}>
      {loading ? "..." : children}
    </ActionButton>
  );
};

export default AddFriendButton;