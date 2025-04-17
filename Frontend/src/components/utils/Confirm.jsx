import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.inputBackground};
  background-color: ${({ confirm, theme }) => (confirm ? theme.colors.primaryDark : theme.colors.error)};
  box-shadow: ${({ theme }) => theme.shadows.light};

  &:hover {
    opacity: 0.9;
  }
`;

const Confirm = ({ message, onConfirm, onCancel }) => {
  return (
    <Overlay>
      <PopupContainer>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button confirm onClick={onConfirm}>
            Confirmar
          </Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default Confirm;