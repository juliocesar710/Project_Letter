import styled from "styled-components";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { ConfirmButton } from "../../../styles/Shared/buttons";

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

const Confirm = ({ message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <Overlay>
      <PopupContainer>
        <Message>{message}</Message>
        <ButtonContainer>
          <ConfirmButton
            confirm
            onClick={() => {
              onConfirm();
              window.location.reload();
            }}
          >
            {t("confirm")}
          </ConfirmButton>
          <Button onClick={onCancel}>{t("cancel")}</Button>
        </ButtonContainer>
      </PopupContainer>
    </Overlay>,
    document.body
  );
};

export default Confirm;
