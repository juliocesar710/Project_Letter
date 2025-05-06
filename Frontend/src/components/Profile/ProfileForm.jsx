import styled from "styled-components";
import Sucess from "../utils/Sucess";
import Alert from "../utils/Error";
import GenreSelector from "../utils/GenreSelector";
import { useProfileForm } from "../../Hooks/useProfileForm";

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

const ProfileForm = ({ isEdit = false }) => {
  const {
    formData,
    selectedGenres,
    loading,
    successMessage,
    errorMessage,
    handleChange,
    setSelectedGenres,
    handleSubmit,
  } = useProfileForm();

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>{isEdit ? "Editar Perfil" : "Editando"}</FormTitle>
        {successMessage && <Sucess message={successMessage} />}
        {errorMessage && <Alert message={errorMessage} />}
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