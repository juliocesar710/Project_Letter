import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const AuthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
`;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const FormContainer = styled.div`
  position: relative;
  width: 200%;
  display: flex;
  flex-direction: row;
  transition: transform 0.5s ease-in-out;
  transform: ${({ activeTab }) =>
    activeTab === "login" ? "translateX(0)" : "translateX(-50%)"};
`;

const FormWrapper = styled.div`
  width: 50%;
  flex-shrink: 0;
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
