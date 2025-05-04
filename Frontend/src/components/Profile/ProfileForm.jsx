import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { updateUser } from "../../api/Auth/userUpdate";
import Sucess from "../utils/Sucess";
import Alert from "../utils/Error";
import GenreSelector from "../utils/GenreSelector";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.border}
  );
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const Form = styled.form`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.light};
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.inputBackground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.borderFocus};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.padding.button};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inputBackground};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

const ProfileForm = ({ onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    birthDate: "",
    profileImage: "",
    interests: [],
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("userData") || "{}");
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      description: userData.description || "",
      birthDate: userData.birthDate || "",
      profileImage: userData.profileImage || "",
    });
    setSelectedGenres(userData.interests || []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const payload = {
      ...formData,
      birthDate: formData.birthDate
        ? new Date(formData.birthDate).toISOString()
        : null,
      genres: selectedGenres,
    };

    try {
      const updatedUser = await updateUser(payload);
      Cookies.set("userData", JSON.stringify(updatedUser), { expires: 1 });
      onSubmit(updatedUser);
    } catch (error) {
      setErrorMessage("Erro ao atualizar o usuário. Tente novamente.");
      console.error("Erro ao atualizar o usuário:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage("Usuário atualizado com sucesso!");
      }, 2000);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{isEdit ? "Editar Perfil" : "Editando"}</FormTitle>
        {successMessage && <Sucess message={successMessage} />}{" "}
        {errorMessage && <Alert message={errorMessage} />}{" "}
        <Input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextArea
          name="description"
          placeholder="Biografia"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="date"
          name="birthDate"
          placeholder="Data de Nascimento"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="profileImage"
          placeholder="URL da Imagem de Perfil"
          value={formData.profileImage}
          onChange={handleChange}
        />
        <GenreSelector
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : isEdit ? "Salvar Alterações" : "Registrar"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileForm;
