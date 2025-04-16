import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/Error";
import { siginin } from "../../api/Auth/userLogin";

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

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlertMessage("Todos os campos são obrigatórios.");
      return;
    }

    setAlertMessage("");
    console.log("Login enviado", { email, password });

    try {
      const data = await siginin({ email, password });

      Cookies.set("authToken", data.token, { expires: 1 });
      Cookies.set("userData", JSON.stringify(data.user), { expires: 1 });

      setAlertMessage("");
      setLoading(true);

      setTimeout(() => {
        navigate("/profile");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setAlertMessage(
        "Erro ao tentar fazer login do usuário. Tente novamente."
      );
    }
  };

  return (
    <FormContainer className="form-container" onSubmit={handleSubmit}>
      <Title>Login</Title>
      {alertMessage && <Alert message={alertMessage} />}
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

      <Button className="button-primary" type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </Button>
    </FormContainer>
  );
};

export default LoginForm;
