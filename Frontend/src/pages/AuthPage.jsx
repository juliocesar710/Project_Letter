import React from "react";
import AuthTabs from "../components/Auth/AuthTabs";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(90deg, ${({theme})=> theme.colors.background}, ${({theme})=> theme.colors.border});
`;

const Heading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: ${({theme})=> theme.colors.primaryDark};
`;

const AuthPage = () => {

  const { t } = useTranslation();
  return (
    <PageContainer>
      <div>
        <Heading>{t("welcome")}</Heading>
        <AuthTabs />
      </div>
    </PageContainer>
  );
};

export default AuthPage;
