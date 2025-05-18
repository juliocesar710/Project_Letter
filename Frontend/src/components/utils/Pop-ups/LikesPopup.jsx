import { useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

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
  padding: 20px 24px;
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

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};

      &:last-child {
        border-bottom: none;
      }
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text};
  }

  /* Scrollbar leve */
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

const LikesPopup = ({ onClose, fetchLikes, users, loading }) => {
  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h3>Usuários que curtiram</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : users.length === 0 ? (
          <p>Nenhum usuário curtiu ainda.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </PopupContainer>
    </Overlay>,
    document.body
  );
};

export default LikesPopup;
