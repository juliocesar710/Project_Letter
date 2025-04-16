import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;
const Description = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text};
`;

const GoupButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.padding.button};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 10px;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const HomePage = () => {

    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Formulário enviado!!");
    navigate("/auth");
  };

  return (
    <Container>
      <Title>Bem vindo ao Letter</Title>
      <Description>
        Esta alicação visa algum dia ser uma grande rede social para leitores e
        escritores
      </Description>
      <GoupButton>
        <Button onClick={handleSubmit}>Login</Button>
      </GoupButton>
    </Container>
  );
};

export default HomePage;
