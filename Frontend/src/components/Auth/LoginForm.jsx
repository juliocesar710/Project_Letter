import React, { useState } from "react";
import styled from "styled-components";
import { theme } from '../../styles/theme';

const FormContainer = styled.form`
  &.form-container {
    background-color: ${theme.colors.background};
    padding: ${theme.padding.container};
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.light};
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${theme.colors.primaryDark};
`;

const Input = styled.input`
  &.input-global {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid ${theme.colors.border};
    border-radius: 5px;
    font-size: 16px;
    background-color: ${theme.colors.inputBackground};

    &:focus {
      border-color: ${theme.colors.borderFocus};
      outline: none;
    }
  }
`;

const Button = styled.button`
  &.button-primary {
    width: 100%;
    padding: 12px;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.inputBackground};
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 14px;
  margin: 5px 0;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    setError(""); 
    console.log("Login enviado", { email, password });
  };

  return (
    <FormContainer className="form-container" onSubmit={handleSubmit}>
      <Title>Login</Title>
      <Input
        className="input-global"
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        className="input-global"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button className="button-primary" type="submit">Entrar</Button>
    </FormContainer>
  );
};

export default LoginForm;
