import React from "react";
import AuthTabs from "../components/Auth/AuthTabs";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(90deg, #f5f2ed, #e0dcd5);
`;

const Heading = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  color: #8c8579;
`;

const AuthPage = () => {
  return (
    <PageContainer>
      <div>
        <Heading>Bem-vindo!</Heading>
        <AuthTabs />
      </div>
    </PageContainer>
  );
};

export default AuthPage;
