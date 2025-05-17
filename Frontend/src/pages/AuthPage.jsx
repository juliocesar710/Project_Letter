import styled from "styled-components";

import { useTranslation } from "react-i18next";

import AuthTabs from "../components/Auth/AuthTabs";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.secondary} 
  );
`;

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.title};
  margin-bottom: ${({ theme }) => theme.padding.container};
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
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
