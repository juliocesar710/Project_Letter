import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Avatar, FormTitle } from "../../../styles/SharedComponents";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: ${({ theme }) => theme.colors.inputBackground};
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.light};
  position: relative;

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 16px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  span {
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
`;

const LikesPopup = ({ onClose, fetchLikes, users, loading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <FormTitle>{t("usersLike")}</FormTitle>

        {loading ? (
          <p>{t("loading")}</p>
        ) : users.length === 0 ? (
          <p>{t("noLikesYet")}</p>
        ) : (
          <ul>
            {users.map((user) => (
              <UserItem key={user.id}>
                <Avatar
                  src={user.profileImage || "default.png"}
                  alt={user.name || "Usuário"}
                />
                <span>{user.name}</span>
              </UserItem>
            ))}
          </ul>
        )}
      </PopupContainer>
    </Overlay>,
    document.body
  );
};

export default LikesPopup;
