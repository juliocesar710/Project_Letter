import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { theme } from "../../styles/theme";
import { updateUser } from "../../api/Auth/userUpdate";
import { useNavigate } from "react-router-dom"; 
import Sucess from "../utils/Sucess";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    90deg,
    ${theme.colors.background},
    ${theme.colors.border}
  );
`;


const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: ${theme.colors.primaryDark};
`;

const Form = styled.form`
  background-color: ${theme.colors.inputBackground};
  padding: 20px;
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.light};
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  font-size: 16px;

  &:focus {
    border-color: ${theme.colors.borderFocus};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.padding.input};
  margin-bottom: 15px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  font-size: 16px;

  &:focus {
    border-color: ${theme.colors.borderFocus};
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${theme.padding.button};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.inputBackground};
  border: none;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

const ProfileForm = ({ onSubmit, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    birthDate: "",
    profileImage: "",
    interests: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("userData") || "{}");
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      bio: userData.bio || "",
      birthDate: userData.birthDate || "",
      profileImage: userData.profileImage || "",
      interests: userData.interests ? userData.interests.join(", ") : "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    setSuccessMessage("");
  
    const payload = {
      name: formData.name,
      email: formData.email,
      genres: formData.interests.split(",").map((interest) => interest.trim()),
    };
  
    try {
      const updatedUser = await updateUser(payload);
      Cookies.set("userData", JSON.stringify(updatedUser), { expires: 1 });
  
      setSuccessMessage("Usuário alterado com sucesso!");
      onSubmit(updatedUser);
  

      setIsLoading(true);
      setTimeout(() => {
        navigate("/profile"); 
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    }  
    
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
      
        <FormTitle>{isEdit ? "Editar Perfil" : "Registrar"}</FormTitle>
        {isLoading && <p>Carregando, salvando...</p>}
        {successMessage && <Sucess message={successMessage} />}
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
        {/* <TextArea
          name="bio"
          placeholder="Biografia"
          value={formData.bio}
          onChange={handleChange}
        /> */}
        {/* <Input
          type="date"
          name="birthDate"
          placeholder="Data de Nascimento"
          value={formData.birthDate}
          onChange={handleChange}
        /> */}
        {/* <Input
          type="text"
          name="profileImage"
          placeholder="URL da Imagem de Perfil"
          value={formData.profileImage}
          onChange={handleChange}
        /> */}
        <Input
          type="text"
          name="interests"
          placeholder="Gêneros Textuais (separados por vírgula)"
          value={formData.interests}
          onChange={handleChange}
        />
        <Button type="submit">
          {isEdit ? "Salvar Alterações" : "Registrar"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileForm;
