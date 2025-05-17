import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: ${({ theme }) => theme.padding.container};
  box-shadow: ${({ theme }) => theme.shadows.light};

  @media ${({ theme }) => theme.breakpoints.mobile} {
    padding: 20px;
    max-width: 100%;
  }
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.padding.container};
  gap: 10px;
`;

const TabButton = styled.button`
  padding: ${({ theme }) => theme.padding.button};
  flex: 1;
  max-width: 150px;
  font-size: ${({ theme }) => theme.fontSize.base};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textContrast};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const FormContainer = styled.div`
  position: relative;
  width: 200%;
  display: flex;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ activeTab }) =>
    activeTab === "login" ? "translateX(0)" : "translateX(-50%)"};
`;

const FormWrapper = styled.div`
  width: 50%;
  padding: 0 10px;
`;

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <TabButtons>
        <TabButton
          onClick={() => setActiveTab("login")}
          className={activeTab === "login" ? "active" : ""}
        >
          {t("login")}
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("register")}
          className={activeTab === "register" ? "active" : ""}
        >
          {t("register")}
        </TabButton>
      </TabButtons>

      <FormContainer activeTab={activeTab}>
        <FormWrapper>
          <LoginForm />
        </FormWrapper>
        <FormWrapper>
          <RegisterForm />
        </FormWrapper>
      </FormContainer>
    </AuthContainer>
  );
};

export default AuthTabs;
