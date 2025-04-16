import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { signup } from "../../api/Auth/userRegister";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Alert from "../utils/Alert";

const FormContainer = styled.form`
  &.form-container {
    background-color: ${theme.colors.background};
    padding: ${theme.padding.container};
    border-radius: ${theme.borderRadius.medium};
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const FormTitle = styled.h2`
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

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      const data = await signup(formData);

      Cookies.set("authToken", data.token, { expires: 1 });
      Cookies.set("userdata", JSON.stringify(data.user), { expires: 1 });
      setError("");
      setLoading(true);

      setTimeout(() => {
        navigate("/profile");
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError("Erro ao registrar usuário. Tente novamente.", error);
      setAlertMessage("Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    <FormContainer className="form-container" onSubmit={handleSubmit}>
      <FormTitle>Registrar</FormTitle>
      {alertMessage && <Alert message={alertMessage} />}
      <Input
        className="input-global"
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        className="input-global"
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        className="input-global"
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        className="input-global"
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button className="button-primary" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Criar Conta"}
      </Button>
    </FormContainer>
  );
};

export default RegisterForm;
